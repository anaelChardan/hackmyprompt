import type { Prompt } from '../types';
/**
 * Determines if a string is a valid file path.
 * @param str - The string to check.
 * @returns True if the string is a valid file path, false otherwise.
 */
export declare function maybeFilePath(str: string): boolean;
/**
 * Normalizes the input prompt to an array of prompts, rejecting invalid and empty inputs.
 * @param promptPathOrGlobs - The input prompt.
 * @returns The normalized prompts.
 * @throws If the input is invalid or empty.
 */
export declare function normalizeInput(promptPathOrGlobs: string | (string | Partial<Prompt>)[] | Record<string, string>): Partial<Prompt>[];
export declare function hashPrompt(prompt: Prompt): string;
//# sourceMappingURL=utils.d.ts.map