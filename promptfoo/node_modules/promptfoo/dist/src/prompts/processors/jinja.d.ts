import type { Prompt } from '../../types';
/**
 * Processes a Jinja2 template file to extract prompts.
 * Similar to markdown files, each Jinja2 file is treated as a single prompt.
 *
 * @param filePath - Path to the Jinja2 template file.
 * @param prompt - The raw prompt data.
 * @returns Array of one `Prompt` object.
 */
export declare function processJinjaFile(filePath: string, prompt: Partial<Prompt>): Prompt[];
//# sourceMappingURL=jinja.d.ts.map