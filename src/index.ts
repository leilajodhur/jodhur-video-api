// ============================================================
// index.ts — Point d'entrée Remotion
// ============================================================
// Remotion lit ce fichier via remotion.config.ts
// Il doit enregistrer toutes les compositions via registerRoot()
// ============================================================

import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
