"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBase64Encoding = addBase64Encoding;
function addBase64Encoding(testCases, injectVar) {
    return testCases.map((testCase) => ({
        ...testCase,
        assert: testCase.assert?.map((assertion) => ({
            ...assertion,
            metric: `${assertion.metric}/Base64`,
        })),
        vars: {
            ...testCase.vars,
            [injectVar]: Buffer.from(String(testCase.vars[injectVar])).toString('base64'),
        },
        metadata: {
            ...testCase.metadata,
            strategyId: 'base64',
        },
    }));
}
//# sourceMappingURL=base64.js.map