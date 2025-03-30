import type { z } from 'zod';
import type { PromptSchema } from '../validators/prompts';
type PromptModel = z.infer<typeof PromptSchema>;
export declare function generateIdFromPrompt(prompt: PromptModel): string;
export {};
//# sourceMappingURL=prompt.d.ts.map