"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRot13 = addRot13;
function addRot13(testCases, injectVar) {
    const rot13 = (str) => {
        return str.replace(/[a-zA-Z]/g, (char) => {
            const code = char.charCodeAt(0);
            const base = char.toLowerCase() === char ? 97 : 65;
            return String.fromCharCode(((code - base + 13) % 26) + base);
        });
    };
    return testCases.map((testCase) => ({
        ...testCase,
        assert: testCase.assert?.map((assertion) => ({
            ...assertion,
            metric: `${assertion.metric}/Rot13`,
        })),
        vars: {
            ...testCase.vars,
            [injectVar]: rot13(String(testCase.vars[injectVar])),
        },
        metadata: {
            ...testCase.metadata,
            strategyId: 'rot13',
        },
    }));
}
//# sourceMappingURL=rot13.js.map