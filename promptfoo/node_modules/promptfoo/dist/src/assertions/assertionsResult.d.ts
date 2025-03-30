import type { AssertionSet, GradingResult, ScoringFunction } from '../types';
export declare const DEFAULT_TOKENS_USED: {
    total: number;
    prompt: number;
    completion: number;
    cached: number;
};
interface ParentAssertionSet {
    index: number;
    assertionSet: AssertionSet;
}
export declare class AssertionsResult {
    static noAssertsResult(): GradingResult;
    private tokensUsed;
    private threshold;
    private _parentAssertionSet;
    private totalScore;
    private totalWeight;
    private failedReason;
    private componentResults;
    private namedScores;
    private result;
    private failedContentSafetyChecks;
    constructor({ threshold, parentAssertionSet, }?: {
        threshold?: number;
        parentAssertionSet?: ParentAssertionSet;
    });
    get parentAssertionSet(): ParentAssertionSet | undefined;
    addResult({ index, result, metric, weight, }: {
        index: number;
        result: GradingResult;
        metric?: string;
        weight?: number;
    }): void;
    testResult(scoringFunction?: ScoringFunction): Promise<GradingResult>;
}
export {};
//# sourceMappingURL=assertionsResult.d.ts.map