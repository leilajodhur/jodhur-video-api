// ============================================================
// JODHUR — Palette de marque officielle
// Cosmétiques naturels marocains
// ============================================================

export const COLORS = {
  // Primaires — Terracotta / Argan
  primary:        '#C4763A',  // Terracotta argan
  primaryDark:    '#8B4E1F',  // Brun profond
  primaryLight:   '#E8A96A',  // Argan clair

  // Secondaires — Or du Maroc
  gold:           '#D4AF37',  // Or traditionnel
  goldLight:      '#F0D070',  // Or clair / reflets
  goldDark:       '#A08020',  // Or foncé

  // Neutres — Sable & Crème
  cream:          '#F5EDD8',  // Crème / fond clair
  sand:           '#E8D5B0',  // Sable chaud
  parchment:      '#F9F2E4',  // Parchemin
  backgroundDark: '#2C1810',  // Expresso profond
  charcoal:       '#3D2B1F',  // Brun charbon

  // Accents — Fleurs & Plantes
  rose:           '#C4607A',  // Rose de Kelaat M'Gouna
  roseLight:      '#E8A0B0',  // Rose pâle
  green:          '#4A7C59',  // Vert Atlas
  greenLight:     '#7AB090',  // Vert clair
  clay:           '#A0522D',  // Argile ghassoul
  lavender:       '#8B7BB5',  // Lavande Moyen Atlas
  lavenderLight:  '#C5BAE0',  // Lavande claire

  // Utilitaires
  white:          '#FDFAF4',  // Blanc chaud
  black:          '#1A0F00',  // Noir chaud
  overlay:        'rgba(28,15,0,0.55)',
  overlayHeavy:   'rgba(28,15,0,0.44)',
  overlayLight:   'rgba(245,237,216,0.88)',
  overlayGold:    'rgba(212,175,55,0.15)',

  // Piliers contenu (pour color-coding)
  pilierHeritage: '#8B4E1F',  // Héritage & Émotion
  pilierEduc:     '#4A7C59',  // Éducation Beauté
  pilierProduit:  '#C4763A',  // Produit & Région
  pilierPromo:    '#C4607A',  // Promo & Offres
} as const;

// Gradients prédéfinis
export const GRADIENTS = {
  hammam:   `linear-gradient(160deg, #2C1810 0%, #8B4E1F 60%, #C4763A 100%)`,
  argan:    `linear-gradient(135deg, #F5EDD8 0%, #E8A96A 50%, #D4AF37 100%)`,
  rose:     `linear-gradient(135deg, #F9F2E4 0%, #E8A0B0 60%, #C4607A 100%)`,
  atlas:    `linear-gradient(160deg, #2C1810 0%, #4A7C59 60%, #7AB090 100%)`,
  promo:    `linear-gradient(135deg, #C4607A 0%, #8B4E1F 50%, #2C1810 100%)`,
  luxury:   `linear-gradient(160deg, #1A0F00 0%, #3D2B1F 40%, #D4AF37 100%)`,
} as const;
