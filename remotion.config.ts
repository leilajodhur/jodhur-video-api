// remotion.config.ts
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// Point d'entrée des compositions
Config.setEntryPoint('./src/index.ts');
