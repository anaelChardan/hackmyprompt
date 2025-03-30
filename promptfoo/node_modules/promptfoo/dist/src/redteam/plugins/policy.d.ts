import type { Assertion, ApiProvider, TestCase, AtomicTestCase, GradingResult } from '../../types';
import { RedteamPluginBase, RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:policy";
export declare class PolicyPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:policy";
    private policy;
    constructor(provider: ApiProvider, purpose: string, injectVar: string, config: {
        policy: string;
    });
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
    generateTests(n: number, delayMs: number): Promise<TestCase[]>;
}
export declare class PolicyViolationGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:policy";
    rubric: string;
    getResult(prompt: string, llmOutput: string, test: AtomicTestCase, provider: ApiProvider | undefined): Promise<{
        grade: GradingResult;
        rubric: string;
    }>;
}
//# sourceMappingURL=policy.d.ts.map