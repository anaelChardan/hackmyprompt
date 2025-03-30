"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertValidationError = void 0;
exports.validateAssertions = validateAssertions;
class AssertValidationError extends Error {
    constructor(message, testCase) {
        const testCaseDescription = testCase.description || JSON.stringify(testCase);
        super(`${message} in:\n${testCaseDescription}`);
        this.name = 'AssertValidationError';
    }
}
exports.AssertValidationError = AssertValidationError;
function validateAssertSet(assertion, test) {
    if (!('assert' in assertion)) {
        throw new AssertValidationError('assert-set must have an `assert` property', test);
    }
    if (!Array.isArray(assertion.assert)) {
        throw new AssertValidationError('assert-set `assert` must be an array of assertions', test);
    }
    if (assertion.assert.some((assertion) => assertion.type === 'assert-set')) {
        throw new AssertValidationError('assert-set must not have child assert-sets', test);
    }
}
function validateAssertions(tests) {
    for (const test of tests) {
        if (test.assert) {
            for (const assertion of test.assert) {
                if (assertion.type === 'assert-set') {
                    validateAssertSet(assertion, test);
                }
            }
        }
    }
}
//# sourceMappingURL=validateAssertions.js.map