export declare const state: {
    cachedPythonPath: string | null;
};
/**
 * Attempts to validate a Python executable path.
 * @param path - The path to the Python executable to test.
 * @returns The validated path if successful, or null if invalid.
 */
export declare function tryPath(path: string): Promise<string | null>;
/**
 * Validates and caches the Python executable path.
 *
 * @param pythonPath - Path to the Python executable.
 * @param isExplicit - If true, only tries the provided path.
 * @returns Validated Python executable path.
 * @throws {Error} If no valid Python executable is found.
 */
export declare function validatePythonPath(pythonPath: string, isExplicit: boolean): Promise<string>;
/**
 * Runs a Python script with the specified method and arguments.
 *
 * @param scriptPath - The path to the Python script to run.
 * @param method - The name of the method to call in the Python script.
 * @param args - An array of arguments to pass to the Python script.
 * @param options - Optional settings for running the Python script.
 * @param options.pythonExecutable - Optional path to the Python executable.
 * @returns A promise that resolves to the output of the Python script.
 * @throws An error if there's an issue running the Python script or parsing its output.
 */
export declare function runPython(scriptPath: string, method: string, args: (string | number | object | undefined)[], options?: {
    pythonExecutable?: string;
}): Promise<any>;
//# sourceMappingURL=pythonUtils.d.ts.map