import type { TestSuite } from '../../types';
/**
 * Options for filtering test cases in a test suite.
 */
export interface FilterOptions {
    /** Path or ID to filter tests that resulted in errors */
    errorsOnly?: string;
    /** Path or ID to filter tests that did not pass (failed from assert or errors) */
    failing?: string;
    /** Number of tests to take from the beginning */
    firstN?: number | string;
    /** Key-value pair (format: "key=value") to filter tests by metadata */
    metadata?: string;
    /** Regular expression pattern to filter tests by description */
    pattern?: string;
    /** Number of random tests to sample */
    sample?: number | string;
}
type Tests = NonNullable<TestSuite['tests']>;
/**
 * Filters a test suite to only include all tests that did not pass (failures + errors)
 * @param testSuite - The test suite containing all tests
 * @param pathOrId - Either a file path to a JSON results file or an eval ID
 * @returns A filtered array of tests that failed in the specified eval
 */
export declare function filterFailingTests(testSuite: TestSuite, pathOrId: string): Promise<Tests>;
/**
 * Filters a test suite to only include tests that resulted in errors from a specific eval
 * @param testSuite - The test suite containing all tests
 * @param pathOrId - Either a file path to a JSON results file or an eval ID
 * @returns A filtered array of tests that resulted in errors in the specified evaluation
 */
export declare function filterErrorTests(testSuite: TestSuite, pathOrId: string): Promise<Tests>;
/**
 * Applies multiple filters to a test suite based on the provided options.
 * Filters are applied in the following order:
 * 1. Metadata filter
 * 2. Failing tests filter
 * 3. Error tests filter
 * 4. Pattern filter
 * 5. First N filter
 * 6. Random sample filter
 *
 * @param testSuite - The test suite containing all tests
 * @param options - Configuration options for filtering
 * @returns A filtered array of tests that match all the specified criteria
 * @throws {Error} If metadata filter format is invalid or if numeric filters contain non-numeric values
 */
export declare function filterTests(testSuite: TestSuite, options: FilterOptions): Promise<Tests>;
export {};
//# sourceMappingURL=filterTests.d.ts.map