import type { Command } from 'commander';
export declare function downloadFile(url: string, filePath: string): Promise<void>;
export declare function downloadDirectory(dirPath: string, targetDir: string): Promise<void>;
export declare function downloadExample(exampleName: string, targetDir: string): Promise<void>;
export declare function getExamplesList(): Promise<string[]>;
export declare function selectExample(): Promise<string>;
export declare function initCommand(program: Command): void;
//# sourceMappingURL=init.d.ts.map