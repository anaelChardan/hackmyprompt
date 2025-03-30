import type { TestCase } from '../types';
export declare class AssertValidationError extends Error {
    constructor(message: string, testCase: TestCase);
}
export declare function validateAssertions(tests: TestCase<Record<string, string | object | string[]>>[]): void;
//# sourceMappingURL=validateAssertions.d.ts.map