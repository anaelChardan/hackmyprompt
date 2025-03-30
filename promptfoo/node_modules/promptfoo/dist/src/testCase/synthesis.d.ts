import type { TestCase, TestSuite, VarMapping } from '../types';
interface SynthesizeOptions {
    instructions?: string;
    numPersonas?: number;
    numTestCasesPerPersona?: number;
    prompts: string[];
    provider?: string;
    tests: TestCase[];
}
export declare function generatePersonasPrompt(prompts: string[], numPersonas: number): string;
export declare function testCasesPrompt(prompts: string[], persona: string, tests: TestCase[], numTestCasesPerPersona: number, variables: string[], instructions?: string): string;
export declare function synthesize({ prompts, instructions, tests, numPersonas, numTestCasesPerPersona, provider, }: SynthesizeOptions): Promise<VarMapping[]>;
export declare function synthesizeFromTestSuite(testSuite: TestSuite, options: Partial<SynthesizeOptions>): Promise<VarMapping[]>;
export {};
//# sourceMappingURL=synthesis.d.ts.map