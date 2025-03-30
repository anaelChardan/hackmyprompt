import type { UnifiedConfig } from '../types';
import { type Plugin, type Severity } from './constants';
import type { RedteamPluginObject, SavedRedteamConfig } from './types';
export declare function getRiskCategorySeverityMap(plugins?: RedteamPluginObject[]): Record<Plugin, Severity>;
export declare function getUnifiedConfig(config: SavedRedteamConfig): UnifiedConfig & {
    redteam: NonNullable<UnifiedConfig['redteam']>;
};
//# sourceMappingURL=sharedFrontend.d.ts.map