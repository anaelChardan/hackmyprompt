import type { Prompt, ApiProvider } from '../../types';
/**
 * Python prompt function. Runs a specific function from the python file.
 * @param promptPath - Path to the Python file.
 * @param functionName - Function name to execute.
 * @param context - Context for the prompt.
 * @returns The prompts
 */
export declare const pythonPromptFunction: (filePath: string, functionName: string, context: {
    vars: Record<string, string | object>;
    provider?: ApiProvider;
    config?: Record<string, any>;
}) => Promise<any>;
/**
 * Legacy Python prompt function. Runs the whole python file.
 * @param filePath - Path to the Python file.
 * @param context - Context for the prompt.
 * @returns The prompts
 */
export declare const pythonPromptFunctionLegacy: (filePath: string, context: {
    vars: Record<string, string | object>;
    provider?: ApiProvider;
    config?: Record<string, any>;
}) => Promise<string>;
/**
 * Processes a Python file to extract or execute a function as a prompt.
 * @param filePath - Path to the Python file.
 * @param prompt - The raw prompt data.
 * @param functionName - Optional function name to execute.
 * @returns Array of prompts extracted or executed from the file.
 */
export declare function processPythonFile(filePath: string, prompt: Partial<Prompt>, functionName: string | undefined): Prompt[];
//# sourceMappingURL=python.d.ts.map