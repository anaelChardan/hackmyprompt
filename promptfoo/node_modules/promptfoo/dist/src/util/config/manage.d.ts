import type { UnifiedConfig } from '../../types';
export declare function getConfigDirectoryPath(createIfNotExists?: boolean): string;
export declare function setConfigDirectoryPath(newPath: string | undefined): void;
export declare function writePromptfooConfig(config: Partial<UnifiedConfig>, outputPath: string): Partial<UnifiedConfig>;
//# sourceMappingURL=manage.d.ts.map