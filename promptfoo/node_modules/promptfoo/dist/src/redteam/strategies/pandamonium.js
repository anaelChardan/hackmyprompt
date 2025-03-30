"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPandamonium = addPandamonium;
function addPandamonium(testCases, injectVar, config) {
    const plugins = new Set(testCases.map((testCase) => testCase.metadata?.pluginId));
    return [
        {
            ...testCases[0],
            provider: {
                id: 'promptfoo:redteam:pandamonium',
                config: {
                    injectVar,
                    ...config,
                },
            },
            metadata: {
                ...testCases[0].metadata,
                pluginIds: Array.from(plugins),
                strategyId: 'pandamonium',
            },
            assert: testCases[0].assert?.map((assertion) => ({
                ...assertion,
                metric: `${assertion.metric}/Pandamonium`,
            })),
        },
    ];
}
//# sourceMappingURL=pandamonium.js.map