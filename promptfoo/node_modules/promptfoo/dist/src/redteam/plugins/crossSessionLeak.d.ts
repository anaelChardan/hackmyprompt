import type { Assertion, AtomicTestCase, GradingResult, TestCase } from '../../types';
import { RedteamPluginBase, RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:cross-session-leak";
export declare class CrossSessionLeakPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:cross-session-leak";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
    generateTests(n: number, delayMs: number): Promise<TestCase[]>;
}
export declare class CrossSessionLeakGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:cross-session-leak";
    rubric: string;
    getResult(prompt: string, llmOutput: string, test: AtomicTestCase): Promise<{
        grade: GradingResult;
        rubric: string;
    }>;
}
//# sourceMappingURL=crossSessionLeak.d.ts.map