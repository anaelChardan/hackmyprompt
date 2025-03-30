import type { TestCase, TestSuite } from '../../types';
/**
 * Emits a warning if Azure providers are used with model-graded assertions without
 * explicitly setting a provider for the assertions.
 */
export declare function maybeEmitAzureOpenAiWarning(testSuite: TestSuite, tests: TestCase[]): boolean;
//# sourceMappingURL=warnings.d.ts.map