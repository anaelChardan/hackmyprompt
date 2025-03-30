export declare const functionCache: Record<string, Function>;
export interface LoadFunctionOptions {
    filePath: string;
    functionName?: string;
    defaultFunctionName?: string;
    basePath?: string;
    useCache?: boolean;
}
/**
 * Loads a function from a JavaScript or Python file
 * @param options Options for loading the function
 * @returns The loaded function
 */
export declare function loadFunction<T extends Function>({ filePath, functionName, defaultFunctionName, basePath, useCache, }: LoadFunctionOptions): Promise<T>;
/**
 * Extracts the file path and function name from a file:// URL
 * @param fileUrl The file:// URL (e.g., "file://path/to/file.js:functionName")
 * @returns The file path and optional function name
 */
export declare function parseFileUrl(fileUrl: string): {
    filePath: string;
    functionName?: string;
};
//# sourceMappingURL=loadFunction.d.ts.map