"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterTestsByResults = filterTestsByResults;
const eval_1 = __importDefault(require("../../models/eval"));
const util_1 = require("../../util");
/**
 * Filters tests based on previous evaluation results
 * @param testSuite - Test suite to filter
 * @param pathOrId - JSON results file path or eval ID
 * @param filterFn - Predicate to determine which results to include
 * @returns Filtered array of tests
 */
async function filterTestsByResults(testSuite, pathOrId, filterFn) {
    if (!testSuite.tests) {
        return [];
    }
    let results;
    try {
        if (pathOrId.endsWith('.json')) {
            const output = await (0, util_1.readOutput)(pathOrId);
            results = output.results;
        }
        else {
            const eval_ = await eval_1.default.findById(pathOrId);
            if (!eval_) {
                return [];
            }
            const summary = await eval_.toEvaluateSummary();
            if ('results' in summary) {
                results = { results: summary.results };
            }
            else {
                return [];
            }
        }
    }
    catch {
        return [];
    }
    const filteredResults = results.results.filter(filterFn);
    if (filteredResults.length === 0) {
        return [];
    }
    return [...testSuite.tests].filter((test) => filteredResults.some((result) => (0, util_1.resultIsForTestCase)(result, test)));
}
//# sourceMappingURL=filterTestsUtil.js.map