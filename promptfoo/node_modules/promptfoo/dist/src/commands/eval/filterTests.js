"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFailingTests = filterFailingTests;
exports.filterErrorTests = filterErrorTests;
exports.filterTests = filterTests;
const logger_1 = __importDefault(require("../../logger"));
const types_1 = require("../../types");
const filterTestsUtil_1 = require("./filterTestsUtil");
/**
 * Filters a test suite to only include all tests that did not pass (failures + errors)
 * @param testSuite - The test suite containing all tests
 * @param pathOrId - Either a file path to a JSON results file or an eval ID
 * @returns A filtered array of tests that failed in the specified eval
 */
async function filterFailingTests(testSuite, pathOrId) {
    return (0, filterTestsUtil_1.filterTestsByResults)(testSuite, pathOrId, (result) => !result.success);
}
/**
 * Filters a test suite to only include tests that resulted in errors from a specific eval
 * @param testSuite - The test suite containing all tests
 * @param pathOrId - Either a file path to a JSON results file or an eval ID
 * @returns A filtered array of tests that resulted in errors in the specified evaluation
 */
async function filterErrorTests(testSuite, pathOrId) {
    return (0, filterTestsUtil_1.filterTestsByResults)(testSuite, pathOrId, (result) => result.failureReason === types_1.ResultFailureReason.ERROR);
}
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
async function filterTests(testSuite, options) {
    let tests = testSuite.tests || [];
    logger_1.default.debug(`Starting filterTests with options: ${JSON.stringify(options)}`);
    logger_1.default.debug(`Initial test count: ${tests.length}`);
    if (Object.keys(options).length === 0) {
        logger_1.default.debug('No filter options provided, returning all tests');
        return tests;
    }
    if (options.metadata) {
        const [key, value] = options.metadata.split('=');
        if (!key || value === undefined) {
            throw new Error('--filter-metadata must be specified in key=value format');
        }
        logger_1.default.debug(`Filtering for metadata ${key}=${value}`);
        logger_1.default.debug(`Before metadata filter: ${tests.length} tests`);
        tests = tests.filter((test) => {
            if (!test.metadata) {
                logger_1.default.debug(`Test has no metadata: ${test.description || 'unnamed test'}`);
                return false;
            }
            const testValue = test.metadata[key];
            let matches = false;
            if (Array.isArray(testValue)) {
                // For array metadata, check if any value includes the search term
                matches = testValue.some((v) => v.toString().includes(value));
            }
            else if (testValue !== undefined) {
                // For single value metadata, check if it includes the search term
                matches = testValue.toString().includes(value);
            }
            if (!matches) {
                logger_1.default.debug(`Test "${test.description || 'unnamed test'}" metadata doesn't match. Expected ${key} to include ${value}, got ${JSON.stringify(test.metadata)}`);
            }
            return matches;
        });
        logger_1.default.debug(`After metadata filter: ${tests.length} tests remain`);
    }
    if (options.failing) {
        tests = await filterFailingTests(testSuite, options.failing);
    }
    if (options.errorsOnly) {
        tests = await filterErrorTests(testSuite, options.errorsOnly);
    }
    if (options.pattern) {
        const pattern = new RegExp(options.pattern);
        tests = tests.filter((test) => test.description && pattern.test(test.description));
    }
    if (options.firstN !== undefined) {
        const count = typeof options.firstN === 'number' ? options.firstN : Number.parseInt(options.firstN);
        if (Number.isNaN(count)) {
            throw new Error(`firstN must be a number, got: ${options.firstN}`);
        }
        tests = tests.slice(0, count);
    }
    if (options.sample !== undefined) {
        const count = typeof options.sample === 'number' ? options.sample : Number.parseInt(options.sample);
        if (Number.isNaN(count)) {
            throw new Error(`sample must be a number, got: ${options.sample}`);
        }
        // Fisher-Yates shuffle and take first n elements
        const shuffled = [...tests];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        tests = shuffled.slice(0, count);
    }
    return tests;
}
//# sourceMappingURL=filterTests.js.map