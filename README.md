# 🎬 JODHUR — Remotion Cosmetics Templates

Système complet de **5 templates vidéo Remotion** pour le marketing digital de la marque **JODHUR** (cosmétiques naturels marocains) sur TikTok, Instagram Reels et YouTube Shorts.

---

## 📦 Structure du projet

```
remotion-cosmetics-maroc/
├── package.json
├── remotion.config.ts
├── src/
│   ├── index.ts                    ← Point d'entrée Remotion
│   ├── Root.tsx                    ← Enregistrement des 5 compositions
│   ├── Compositions.tsx            ← Config + IDs des compositions
│   ├── types.ts                    ← Interfaces TypeScript (props de chaque template)
│   ├── constants/
│   │   ├── colors.ts               ← Palette JODHUR + dégradés
│   │   └── fonts.ts                ← Typographies + tailles
│   ├── components/
│   │   ├── TikTokCaption.tsx       ← Captions animées (word-by-word, slide-up, fade)
│   │   ├── PriceTag.tsx            ← Affichage prix MAD + badge urgence
│   │   ├── CTAOverlay.tsx          ← Overlay CTA (WhatsApp / lien bio / website)
│   │   └── HookText.tsx            ← Hook texte (cinematic, split, punch, overlay)
│   ├── templates/
│   │   ├── T1_PromoFlash.tsx       ← Reel 30s · Promo & Offres
│   │   ├── T2_HeritageStory.tsx    ← Reel 30s · Héritage & Émotion
│   │   ├── T3_ProduitRegion.tsx    ← Reel 45s · Produit & Région
│   │   ├── T4_TutorialRoutine.tsx  ← Vidéo 60s · Éducation Beauté
│   │   └── T5_CarouselAnime.tsx    ← Carousel animé 45s
│   └── data/
│       └── excelData.ts            ← 5 instances mappées depuis Full automation.xlsx
```

---

## 🚀 Installation & démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer Remotion Studio (prévisualisation interactive)
npm run studio

# 3. Render une composition spécifique
npm run render:t1   # T1 — Promo Flash
npm run render:t2   # T2 — Héritage Story
npm run render:t3   # T3 — Produit Région
npm run render:t4   # T4 — Tutorial Routine
npm run render:t5   # T5 — Carousel Animé

# 4. Render tous les templates
npm run render:all
```

Les fichiers `.mp4` sont générés dans le dossier `out/`.

---

## 🎨 Les 5 Templates

### T1 — PromoFlash · Reel 30s
**Pilier** : Promo & Offres (Samedi, semaines de conversion)
**Durée** : 900 frames @ 30fps (30 secondes)
**Format** : 1080 × 1920

| Scène | Frames | Durée | Contenu |
|-------|--------|-------|---------|
| Hook | 0–90 | 0–3s | Texte hook punch + dégradé hammam |
| Produit | 90–300 | 3–10s | Image Ken Burns + liste bénéfices staggered |
| Prix | 300–660 | 10–22s | PriceTag flash + badge urgence + labels 🌿✅🇲🇦 |
| Social proof | 660–810 | 22–27s | 2 témoignages glissants |
| CTA | 810–900 | 27–30s | CTAOverlay variant="full" |

**Mapping Excel** : Lignes format `reel-30` du pilier `promo`

---

### T2 — HeritageStory · Reel 30s
**Pilier** : Héritage & Émotion (Lundi semaines 1–3)
**Durée** : 900 frames @ 30fps (30 secondes)

| Scène | Frames | Durée | Contenu |
|-------|--------|-------|---------|
| Atmosphère | 0–150 | 0–5s | Image région Ken Burns + badge années |
| Histoire | 150–360 | 5–12s | Split image/texte FR + Darija RTL |
| Héritage | 360–660 | 12–22s | Parallax + citation émotion + lignes or |
| Révélation | 660–810 | 22–27s | Produit spring-in + badges artisanal |
| CTA | 810–900 | 27–30s | CTAOverlay variant="whatsapp" |

**Mapping Excel** : Lignes format `reel-30` du pilier `heritage-emotion`

---

### T3 — ProduitRegion · Reel 45s
**Pilier** : Produit & Région (Lundi + Jeudi)
**Durée** : 1350 frames @ 30fps (45 secondes)

| Scène | Frames | Durée | Contenu |
|-------|--------|-------|---------|
| Hook géo | 0–150 | 0–5s | Image région plein écran + badge 🇲🇦 |
| Voyage régional | 150–600 | 5–20s | Parallax + fait d'origine + fun facts staggered |
| Extraction | 600–1050 | 20–35s | Étapes avec barre de progression active |
| Bénéfices | 1050–1260 | 35–42s | Produit spring-in + cartes bénéfices |
| CTA | 1260–1350 | 42–45s | CTAOverlay variant="full" |

**Mapping Excel** : Lignes `reel-45` du pilier `produit-region`

---

### T4 — TutorialRoutine · Vidéo 60s
**Pilier** : Éducation Beauté (Lundi semaines 4–8)
**Durée** : 1800 frames @ 30fps (60 secondes)

| Scène | Frames | Durée | Contenu |
|-------|--------|-------|---------|
| Problème | 0–150 | 0–5s | Hook + énoncé du problème beauté |
| Tutoriel | 150–1500 | 5–50s | StepCards auto-avançantes avec progression |
| Résultats | 1500–1710 | 50–57s | Image produit + texte résultat + tip bonus |
| CTA | 1710–1800 | 57–60s | CTAOverlay variant="full" |

**Mapping Excel** : Lignes `video-60` du pilier `education`

---

### T5 — CarouselAnime · 45s
**Pilier** : Guides & Éducation multi-slides
**Durée** : 1350 frames @ 30fps (45 secondes — 5 slides × 270f)

| Slide | Frames | Durée | Contenu |
|-------|--------|-------|---------|
| Slide 1 | 0–270 | 0–9s | Titre série + hook + "Enregistre 🔖" |
| Slides 2–4 | 270–1080 | 9–36s | Numéro déco + highlight + corps avec flèches |
| Slide 5 | 1080–1350 | 36–45s | CTA + CTAOverlay |

**Mapping Excel** : Lignes `carousel` du pilier `education` ou `produit`

---

## 📊 Mapping depuis Full automation.xlsx

Le fichier `src/data/excelData.ts` contient 5 instances prêtes à l'emploi, mappées directement depuis les colonnes Excel :

| Instance | Semaine | Jour | Produit | Template |
|----------|---------|------|---------|----------|
| `INSTANCE_T1_KIT_HAMMAM` | S1 | Sam | Kit Hammam | T1 |
| `INSTANCE_T2_SAVON_BELDI` | S1 | Lun | Savon Beldi | T2 |
| `INSTANCE_T3_ARGAN` | S2 | Lun | Huile d'Argan | T3 |
| `INSTANCE_T4_ROUTINE_HAMMAM` | S4 | Lun | Routine Hammam | T4 |
| `INSTANCE_T5_ARGAN_GUIDE` | S2 | Mar | Guide Argan | T5 |

### Correspondance colonnes Excel → props Remotion

| Colonne Excel | Prop Remotion | Template(s) |
|---------------|---------------|-------------|
| `hook_fr` | `hookFr` | Tous |
| `hook_darija` | `hookDarija` | Tous |
| `cta` | `cta` | Tous |
| `script_angle` | `benefits[]` / `steps[]` / `body` | T1, T4, T5 |
| `storytelling_emotion` | `storyText` / `resultsText` | T2, T4 |
| `produit_principal` | `productName` | Tous |
| `hashtags` | `hashtags` | Tous |

---

## 🎨 Palette de couleurs JODHUR

| Nom | Hex | Usage |
|-----|-----|-------|
| Terracotta (primary) | `#C4763A` | Accents, badges, CTA |
| Or (gold) | `#D4AF37` | Highlights, prix, titres |
| Crème (cream) | `#F5EDD8` | Fonds clairs |
| Brun foncé | `#2C1810` | Fonds sombres, overlay |
| Vert Atlas | `#4A7C59` | Badges région, naturel |
| Rose argan | `#E8A598` | Slides carousel doux |

---

## 🔧 API des composants partagés

### `<TikTokCaption />`
```tsx
<TikTokCaption
  text="Votre texte ici"
  startFrame={0}
  rtl={false}           // true pour Darija
  animationMode="word-by-word"  // | "slide-up" | "fade"
  bgColor={COLORS.primary}
  bottom={60}
/>
```

### `<PriceTag />`
```tsx
<PriceTag
  originalPrice={200}
  promoPrice={149}
  currency="MAD"
  promoCode="JODHUR10"
  startFrame={0}
/>
```

### `<CTAOverlay />`
```tsx
<CTAOverlay
  ctaText="Commander sur WhatsApp"
  whatsappNumber="+212600000000"
  websiteUrl="jodhur.ma"
  brandName="JODHUR"
  startFrame={0}
  variant="full"  // | "whatsapp" | "link-bio" | "website"
/>
```

### `<HookText />`
```tsx
<HookText
  hookFr="La routine beauté des femmes de Fès"
  hookDarija="الروتين الجمالي ديال نساء فاس"
  variant="cinematic"  // | "split" | "punch" | "overlay"
  bgColor="transparent"
  textColor={COLORS.white}
  accentColor={COLORS.gold}
/>
```

---

## 📐 Contraintes techniques Remotion

- **Dimensions** : 1080 × 1920 (portrait 9:16)
- **FPS** : 30 pour tous les templates
- **Format de sortie** : MP4 (H.264)
- **`spring()`** : utilisé pour toutes les entrées (produits, prix, cartes)
- **`interpolate()`** : transitions douces (opacité, translateY/X, scale, width)
- **`Sequence`** : découpage des scènes sans TransitionSeries (compatibilité v4)
- **RTL** : `direction: 'rtl'` + `fontFamily: FONTS.arabic` (Cairo) pour Darija
- **Ken Burns** : `interpolate(frame, [0, N], [1, 1.06])` sur les images régionales

---

## 🇲🇦 Spécificités marché marocain

- **Prix en MAD** — toujours affichés avec le suffixe "MAD" ou "DH"
- **WhatsApp CTA** — numéro format `+212 6XX XXX XXX`
- **Darija** — textes RTL, font Cairo, positionnés en bas de vidéo
- **Labels clés** — 🌿 Naturel · ✅ Halal · 🇲🇦 Artisanal · 🔬 Sans paraben
- **Plateformes** — TikTok primaire · Instagram Reels · YouTube Shorts

---

*Projet généré automatiquement à partir du planning éditorial Full automation.xlsx*
*Marque : JODHUR · Cosmétiques naturels marocains*
