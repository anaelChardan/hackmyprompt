/**
 * Executes Python code by writing it to a temporary file
 * @param {string} code - The Python code to execute.
 * @param {string} method - The method name to call in the Python script.
 * @param {(string | object | undefined)[]} args - The list of arguments to pass to the Python method.
 * @returns {Promise<any>} - The result from executing the Python code.
 */
export declare function runPythonCode(code: string, method: string, args: (string | object | undefined)[]): Promise<any>;
//# sourceMappingURL=wrapper.d.ts.map