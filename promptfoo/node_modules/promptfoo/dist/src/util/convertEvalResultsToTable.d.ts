import { type EvaluateTable, type ResultsFile, type TokenUsage } from '../types';
export declare class PromptMetrics {
    score: number;
    testPassCount: number;
    testFailCount: number;
    testErrorCount: number;
    assertPassCount: number;
    assertFailCount: number;
    totalLatencyMs: number;
    tokenUsage: TokenUsage;
    namedScores: Record<string, number>;
    namedScoresCount: Record<string, number>;
    cost: number;
    constructor();
}
export declare function convertResultsToTable(eval_: ResultsFile): EvaluateTable;
//# sourceMappingURL=convertEvalResultsToTable.d.ts.map