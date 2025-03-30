"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequenceProvider = void 0;
const logger_1 = __importDefault(require("../logger"));
const invariant_1 = __importDefault(require("../util/invariant"));
const templates_1 = require("../util/templates");
class SequenceProvider {
    constructor({ id, config }) {
        (0, invariant_1.default)(config && Array.isArray(config.inputs), 'Expected sequence provider config to contain an array of inputs');
        const typedConfig = config;
        this.inputs = typedConfig.inputs;
        this.separator = typedConfig.separator || '\n---\n';
        this.identifier = id || 'sequence-provider';
    }
    id() {
        return this.identifier;
    }
    async callApi(prompt, context, options) {
        (0, invariant_1.default)(context?.originalProvider, 'Expected originalProvider to be set');
        const nunjucks = (0, templates_1.getNunjucksEngine)();
        const responses = [];
        const totalTokenUsage = {
            total: 0,
            prompt: 0,
            completion: 0,
            numRequests: 0,
            cached: 0,
        };
        // Send each input to the original provider
        for (const input of this.inputs) {
            const renderedInput = nunjucks.renderString(input, {
                ...context?.vars,
                prompt,
            });
            logger_1.default.debug(`Sequence provider sending input: ${renderedInput}`);
            const response = await context.originalProvider.callApi(renderedInput, context, options);
            if (response.error) {
                return response;
            }
            responses.push(response.output);
            // Accumulate token usage if available
            if (response.tokenUsage) {
                totalTokenUsage.total += response.tokenUsage.total || 0;
                totalTokenUsage.prompt += response.tokenUsage.prompt || 0;
                totalTokenUsage.completion += response.tokenUsage.completion || 0;
                totalTokenUsage.numRequests += response.tokenUsage.numRequests || 1;
                totalTokenUsage.cached += response.tokenUsage.cached || 0;
            }
            else {
                totalTokenUsage.numRequests += 1;
            }
        }
        return {
            output: responses.join(this.separator),
            tokenUsage: totalTokenUsage,
        };
    }
    toString() {
        return `[Sequence Provider]`;
    }
}
exports.SequenceProvider = SequenceProvider;
//# sourceMappingURL=sequence.js.map