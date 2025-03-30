"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGIN_ID = void 0;
exports.getHarmfulTests = getHarmfulTests;
const envars_1 = require("../../../envars");
const promptfoo_1 = require("../../../providers/promptfoo");
const generation_1 = require("../../../util/generation");
const time_1 = require("../../../util/time");
const common_1 = require("./common");
exports.PLUGIN_ID = 'promptfoo:redteam:harmful';
async function getHarmfulTests({ purpose, injectVar, n, delayMs = 0 }, plugin) {
    const maxHarmfulTests = (0, envars_1.getEnvInt)('PROMPTFOO_MAX_HARMFUL_TESTS_PER_REQUEST', 5);
    const unalignedProvider = new promptfoo_1.PromptfooHarmfulCompletionProvider({
        purpose,
        n: Math.min(n, maxHarmfulTests),
        harmCategory: plugin,
    });
    const generatePrompts = async () => {
        const result = await unalignedProvider.callApi('');
        if (result.output) {
            if (delayMs > 0) {
                await (0, time_1.sleep)(delayMs);
            }
            return result.output;
        }
        return [];
    };
    const allPrompts = await (0, generation_1.retryWithDeduplication)(generatePrompts, n);
    return (0, generation_1.sampleArray)(allPrompts, n).map((prompt) => (0, common_1.createTestCase)(injectVar, prompt, plugin));
}
//# sourceMappingURL=unaligned.js.map