import type { TestCase } from '../../types';
export declare function generateMathPrompt(testCases: TestCase[], injectVar: string, config: Record<string, any>): Promise<TestCase[]>;
export declare function encodeMathPrompt(text: string, concept: string): Promise<string>;
export declare function addMathPrompt(testCases: TestCase[], injectVar: string, config: Record<string, any>): Promise<TestCase[]>;
//# sourceMappingURL=mathPrompt.d.ts.map