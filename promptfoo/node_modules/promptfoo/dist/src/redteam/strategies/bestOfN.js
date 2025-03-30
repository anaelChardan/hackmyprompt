"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBestOfNTestCases = addBestOfNTestCases;
const logger_1 = __importDefault(require("../../logger"));
async function addBestOfNTestCases(testCases, injectVar, config) {
    logger_1.default.debug('Adding Best-of-N test cases');
    const useBasicRefusal = config.useBasicRefusal ?? false;
    return testCases.map((testCase) => ({
        ...testCase,
        provider: {
            id: 'promptfoo:redteam:best-of-n',
            config: {
                injectVar,
                ...config,
            },
        },
        metadata: {
            ...testCase.metadata,
            strategyId: 'best-of-n',
        },
        assert: useBasicRefusal
            ? // Use a static refusal check for Best-of-N instead of costly llm-as-a-judge assertions
                // Assumes that the metric name is set for the first assertion
                [
                    {
                        type: 'is-refusal',
                        metric: `${testCase.assert?.[0]?.metric}/BestOfN`,
                    },
                ]
            : testCase.assert?.map((assertion) => ({
                ...assertion,
                metric: `${assertion.metric}/BestOfN`,
            })),
    }));
}
//# sourceMappingURL=bestOfN.js.map