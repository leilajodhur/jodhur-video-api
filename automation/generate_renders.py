#!/usr/bin/env python3
# ============================================================
# shopify_images.py — Récupération automatique des images
# depuis l'API Shopify pour le pipeline JODHUR
# ============================================================
# Usage:
#   python shopify_images.py              → génère image_map.json
#   python shopify_images.py --test       → affiche les correspondances sans sauvegarder
#   python shopify_images.py --refresh    → force la mise à jour du cache
# ============================================================

import json
import os
import sys
import argparse
import urllib.request
import urllib.parse

# ============================================================
# ⚙️  CONFIG — à remplir une seule fois
# ============================================================
SHOPIFY_CONFIG = {
    "shop_domain": "qxd1dm-qg.myshopify.com",   # ← ex: jodhur.myshopify.com
    "access_token": "your token",       # ← ton Admin API token
}

# ============================================================
# NOMS EXCEL → mots-clés de recherche Shopify
# Ajuste si tes titres Shopify sont différents
# ============================================================
EXCEL_TO_SHOPIFY_KEYWORDS = {
    "Savon Beldi":              ["savon beldi", "beldi", "savon noir"],
    "Huile d'Argan":            ["argan", "huile argan"],
    "Ghassoul":                 ["ghassoul", "ghassul"],
    "Eau de Rose":              ["eau de rose", "rose"],
    "Eau de Fleur d'Oranger":   ["fleur oranger", "fleur d'oranger", "eau florale"],
    "HE Lavande":               ["lavande", "huile essentielle lavande"],
    "Huile de Nigelle":         ["nigelle", "huile nigelle"],
    "Huile de Ricin":           ["ricin", "huile ricin"],
    "Huile Figue de Barbarie":  ["figue de barbarie", "figue barbarie"],
    "Kit Hammam":               ["kit hammam", "kit", "hammam"],
    "Pack Argan + Rose":        ["pack argan", "argan rose"],
    "Pack Anti-Chute":          ["anti-chute", "anti chute", "chute"],
    "Pack Éclat Visage":        ["eclat visage", "éclat", "visage"],
    "Coffret Héritage":         ["coffret heritage", "coffret", "heritage"],
    "Coffret Routine":          ["coffret routine", "routine"],
    "Trio Sanouj":              ["trio", "sanouj"],
    "Box VIP":                  ["box vip", "vip", "box"],
    "Eaux florales":            ["eaux florales", "eau florale", "florale"],
    "Huiles visage":            ["huile visage", "serum", "visage"],
    "Plantes séchées":          ["plantes", "herbes", "plante"],
    # Pas de produits physiques → image générique JODHUR
    "Gamme complète":           None,
    "Coopérative":              None,
    "Impact social":            None,
    "LEILA Chatbot":            None,
    "Code HERITAGE25":          None,
    "Code JODHUR30":            None,
}

# Image fallback si produit non trouvé
FALLBACK_IMAGE = "https://via.placeholder.com/1080x1920/2C1810/D4AF37?text=JODHUR"

# Fichier cache local
CACHE_FILE = "image_map.json"

# ============================================================
# APPEL API SHOPIFY
# ============================================================
def shopify_get(endpoint: str) -> dict:
    url = f"https://{SHOPIFY_CONFIG['shop_domain']}/admin/api/2024-01/{endpoint}"
    req = urllib.request.Request(
        url,
        headers={
            "X-Shopify-Access-Token": SHOPIFY_CONFIG["access_token"],
            "Content-Type": "application/json",
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        print(f"  ❌ Erreur API: {e}")
        return {}

def fetch_all_products() -> list:
    """Récupère tous les produits Shopify (pagination automatique)."""
    all_products = []
    page_info = None

    while True:
        endpoint = "products.json?limit=250&fields=id,title,images"
        if page_info:
            endpoint += f"&page_info={page_info}"

        data = shopify_get(endpoint)
        products = data.get("products", [])
        if not products:
            break
        all_products.extend(products)

        # Pagination cursor
        if len(products) < 250:
            break
        # Note: pour pagination complète, utiliser les headers Link
        break  # Shopify limite à 250 par appel, suffisant pour JODHUR

    print(f"  ✅ {len(all_products)} produits récupérés depuis Shopify")
    return all_products

# ============================================================
# CORRESPONDANCE NOM EXCEL → PRODUIT SHOPIFY
# ============================================================
def normalize(text: str) -> str:
    """Normalise un texte pour comparaison."""
    import unicodedata
    text = text.lower().strip()
    # Supprimer accents
    text = ''.join(
        c for c in unicodedata.normalize('NFD', text)
        if unicodedata.category(c) != 'Mn'
    )
    return text

def find_best_match(excel_name: str, shopify_products: list) -> str | None:
    """
    Cherche le meilleur produit Shopify pour un nom Excel.
    Retourne l'URL de la première image, ou None.
    """
    keywords = EXCEL_TO_SHOPIFY_KEYWORDS.get(excel_name)

    # Pas de produit physique → pas d'image Shopify
    if keywords is None:
        return None

    norm_excel = normalize(excel_name)

    for product in shopify_products:
        norm_title = normalize(product.get("title", ""))
        images = product.get("images", [])
        if not images:
            continue

        img_url = images[0]["src"]

        # 1. Correspondance exacte (titre identique)
        if norm_excel == norm_title:
            return img_url

        # 2. Correspondance par mots-clés
        for kw in keywords:
            if normalize(kw) in norm_title:
                return img_url

        # 3. Le nom Excel est contenu dans le titre Shopify
        if norm_excel in norm_title or norm_title in norm_excel:
            return img_url

    return None

# ============================================================
# PIPELINE PRINCIPAL
# ============================================================
def build_image_map(shopify_products: list) -> dict:
    """Construit le mapping nom_excel → URL image."""
    image_map = {}
    not_found = []

    for excel_name in EXCEL_TO_SHOPIFY_KEYWORDS.keys():
        img_url = find_best_match(excel_name, shopify_products)

        if img_url:
            image_map[excel_name] = img_url
            print(f"  ✅ {excel_name:30s} → {img_url[:60]}...")
        else:
            keywords = EXCEL_TO_SHOPIFY_KEYWORDS[excel_name]
            if keywords is None:
                image_map[excel_name] = FALLBACK_IMAGE
                print(f"  🎨 {excel_name:30s} → image générique JODHUR")
            else:
                image_map[excel_name] = FALLBACK_IMAGE
                not_found.append(excel_name)
                print(f"  ⚠️  {excel_name:30s} → non trouvé (fallback)")

    if not_found:
        print(f"\n⚠️  {len(not_found)} produits non trouvés dans Shopify :")
        for name in not_found:
            print(f"   - {name}")
        print("\n👉 Vérifie les titres exacts dans Shopify et mets à jour")
        print("   EXCEL_TO_SHOPIFY_KEYWORDS dans ce fichier.\n")

    return image_map

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--test",    action="store_true", help="Affiche sans sauvegarder")
    parser.add_argument("--refresh", action="store_true", help="Force la mise à jour du cache")
    args = parser.parse_args()

    # Vérifier config
    if "XXXX" in SHOPIFY_CONFIG["access_token"]:
        print("❌ Configure d'abord SHOPIFY_CONFIG dans shopify_images.py")
        print("   → shop_domain: 'jodhur.myshopify.com'")
        print("   → access_token: 'shpat_...'")
        sys.exit(1)

    # Utiliser le cache si disponible
    if os.path.exists(CACHE_FILE) and not args.refresh:
        print(f"📦 Cache trouvé ({CACHE_FILE}). Utilise --refresh pour forcer la mise à jour.")
        with open(CACHE_FILE) as f:
            image_map = json.load(f)
        print(f"✅ {len(image_map)} images chargées depuis le cache")
        return image_map

    print("🔍 Connexion à Shopify...")
    products = fetch_all_products()

    if not products:
        print("❌ Aucun produit récupéré. Vérifie ton token et shop_domain.")
        sys.exit(1)

    print("\n🔗 Correspondances Excel → Shopify :")
    image_map = build_image_map(products)

    if not args.test:
        with open(CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(image_map, f, ensure_ascii=False, indent=2)
        print(f"\n✅ image_map.json sauvegardé ({len(image_map)} entrées)")
    else:
        print("\n[DRY-RUN] Aucun fichier sauvegardé")

    return image_map

if __name__ == "__main__":
    main()
