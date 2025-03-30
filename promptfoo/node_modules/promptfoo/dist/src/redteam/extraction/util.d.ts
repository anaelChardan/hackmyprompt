import { z } from 'zod';
import type { ApiProvider } from '../../types';
export declare const RedTeamGenerationResponse: z.ZodObject<{
    task: z.ZodString;
    result: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
}, "strip", z.ZodTypeAny, {
    result: string | string[];
    task: string;
}, {
    result: string | string[];
    task: string;
}>;
export type RedTeamTask = 'purpose' | 'entities';
/**
 * Fetches remote generation results for a given task and prompts.
 *
 * @param task - The type of task to perform ('purpose' or 'entities').
 * @param prompts - An array of prompts to process.
 * @returns A Promise that resolves to either a string or an array of strings, depending on the task.
 * @throws Will throw an error if the remote generation fails.
 *
 * @example
 * ```typescript
 * const result = await fetchRemoteGeneration('purpose', ['What is the purpose of this app?']);
 * console.log(result); // Outputs the generated purpose as a string
 * ```
 */
export declare function fetchRemoteGeneration(task: RedTeamTask, prompts: string[]): Promise<string | string[]>;
export declare function callExtraction<T>(provider: ApiProvider, prompt: string, processOutput: (output: string) => T): Promise<T>;
export declare function formatPrompts(prompts: string[]): string;
//# sourceMappingURL=util.d.ts.map