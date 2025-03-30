import type { TestSuite, EvaluateResult } from '../../types';
type Tests = NonNullable<TestSuite['tests']>;
/**
 * Predicate function for filtering test results
 */
type ResultFilterFn = (result: EvaluateResult) => boolean;
/**
 * Filters tests based on previous evaluation results
 * @param testSuite - Test suite to filter
 * @param pathOrId - JSON results file path or eval ID
 * @param filterFn - Predicate to determine which results to include
 * @returns Filtered array of tests
 */
export declare function filterTestsByResults(testSuite: TestSuite, pathOrId: string, filterFn: ResultFilterFn): Promise<Tests>;
export {};
//# sourceMappingURL=filterTestsUtil.d.ts.map