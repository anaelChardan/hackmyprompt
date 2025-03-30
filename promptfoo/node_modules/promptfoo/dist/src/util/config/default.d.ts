import type { UnifiedConfig } from '../../types';
/**
 * Cache to store loaded configurations for different directories.
 */
export declare const configCache: Map<string, {
    defaultConfig: Partial<UnifiedConfig>;
    defaultConfigPath: string | undefined;
}>;
/**
 * Loads the default configuration file from the specified directory.
 *
 * @param dir - The directory to search for configuration files. Defaults to the current working directory.
 * @param configName - The name of the configuration file to load. Defaults to 'promptfooconfig'.
 * @returns A promise that resolves to an object containing the default configuration and its file path.
 * The default configuration is partial, and the file path may be undefined if no configuration is found.
 */
export declare function loadDefaultConfig(dir?: string, configName?: string): Promise<{
    defaultConfig: Partial<UnifiedConfig>;
    defaultConfigPath: string | undefined;
}>;
export declare function clearConfigCache(): void;
//# sourceMappingURL=default.d.ts.map