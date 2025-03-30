import type { ApiProvider, Prompt, PromptFunctionContext } from '../../types';
export declare const transformContext: (context: {
    vars: Record<string, string | object>;
    provider?: ApiProvider;
    config?: Record<string, any>;
}) => PromptFunctionContext;
/**
 * Processes a JavaScript file to import and execute a module function as a prompt.
 * @param filePath - Path to the JavaScript file.
 * @param functionName - Optional function name to execute.
 * @returns Promise resolving to an array of prompts.
 */
export declare function processJsFile(filePath: string, prompt: Partial<Prompt>, functionName: string | undefined): Promise<Prompt[]>;
//# sourceMappingURL=javascript.d.ts.map