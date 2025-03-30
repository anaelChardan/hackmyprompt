"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIterativeJailbreaks = addIterativeJailbreaks;
function addIterativeJailbreaks(testCases, injectVar, strategy = 'iterative', config) {
    const providerName = strategy === 'iterative' ? 'promptfoo:redteam:iterative' : 'promptfoo:redteam:iterative:tree';
    return testCases.map((testCase) => ({
        ...testCase,
        provider: {
            id: providerName,
            config: {
                injectVar,
                ...config,
            },
        },
        assert: testCase.assert?.map((assertion) => ({
            ...assertion,
            metric: `${assertion.metric}/${strategy === 'iterative' ? 'Iterative' : 'IterativeTree'}`,
        })),
        metadata: {
            ...testCase.metadata,
            strategyId: strategy === 'iterative' ? 'jailbreak' : 'jailbreak:tree',
        },
    }));
}
//# sourceMappingURL=iterative.js.map