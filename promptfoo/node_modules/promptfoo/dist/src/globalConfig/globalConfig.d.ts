import type { GlobalConfig } from '../configTypes';
export declare function readGlobalConfig(): GlobalConfig;
export declare function writeGlobalConfig(config: GlobalConfig): void;
/**
 * Merges the top-level keys into existing config.
 * @param partialConfig New keys to merge into the existing config.
 */
export declare function writeGlobalConfigPartial(partialConfig: Partial<GlobalConfig>): void;
//# sourceMappingURL=globalConfig.d.ts.map