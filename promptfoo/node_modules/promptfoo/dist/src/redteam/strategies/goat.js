"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGoatTestCases = addGoatTestCases;
const logger_1 = __importDefault(require("../../logger"));
async function addGoatTestCases(testCases, injectVar, config) {
    logger_1.default.debug('Adding GOAT test cases');
    return testCases.map((testCase) => ({
        ...testCase,
        provider: {
            id: 'promptfoo:redteam:goat',
            config: {
                injectVar,
                ...config,
            },
        },
        assert: testCase.assert?.map((assertion) => ({
            ...assertion,
            metric: `${assertion.metric}/GOAT`,
        })),
        metadata: {
            ...testCase.metadata,
            strategyId: 'goat',
        },
    }));
}
//# sourceMappingURL=goat.js.map