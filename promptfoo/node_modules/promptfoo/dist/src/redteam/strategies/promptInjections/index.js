"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInjections = addInjections;
async function addInjections(testCases, injectVar, config) {
    const sampleSize = config.sample || 1;
    const harmfulOnly = config.harmfulOnly || false;
    const data = (await Promise.resolve().then(() => __importStar(require('./data.json')))).default;
    const injections = sampleSize === 1
        ? // Take skeleton key (the first one) by default
            [(prompt) => data[0].replace(/__PROMPT__/g, prompt)]
        : // Otherwise, take random samples
            data
                .sort(() => 0.5 - Math.random())
                .slice(0, sampleSize)
                .map((injection) => (prompt) => injection.replace(/__PROMPT__/g, prompt));
    const filteredTests = harmfulOnly
        ? testCases.filter((t) => t.metadata?.pluginId?.startsWith('harmful:'))
        : testCases;
    return filteredTests.flatMap((testCase) => injections.map((fn) => ({
        ...testCase,
        assert: testCase.assert?.map((assert) => ({
            ...assert,
            metric: 'Harmful/Injection',
        })),
        vars: {
            ...testCase.vars,
            [injectVar]: `${fn(String(testCase.vars[injectVar]))}`,
        },
        metadata: {
            ...testCase.metadata,
            strategyId: 'prompt-injection',
        },
    })));
}
//# sourceMappingURL=index.js.map