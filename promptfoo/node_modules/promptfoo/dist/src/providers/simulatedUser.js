"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulatedUser = void 0;
const logger_1 = __importDefault(require("../logger"));
const invariant_1 = __importDefault(require("../util/invariant"));
const templates_1 = require("../util/templates");
const time_1 = require("../util/time");
const promptfoo_1 = require("./promptfoo");
class SimulatedUser {
    constructor({ id, label, config }) {
        this.identifier = id ?? label ?? 'agent-provider';
        this.maxTurns = config.maxTurns ?? 10;
        this.rawInstructions = config.instructions || '{{instructions}}';
    }
    id() {
        return this.identifier;
    }
    async sendMessageToUser(messages, userProvider) {
        const flippedMessages = messages.map((message) => {
            return {
                role: message.role === 'user' ? 'assistant' : 'user',
                content: message.content,
            };
        });
        const response = await userProvider.callApi(JSON.stringify(flippedMessages));
        logger_1.default.debug(`User: ${response.output}`);
        return [...messages, { role: 'user', content: response.output }];
    }
    async sendMessageToAgent(messages, targetProvider, prompt) {
        const response = await targetProvider.callApi(JSON.stringify([{ role: 'system', content: prompt }, ...messages]));
        if (targetProvider.delay) {
            logger_1.default.debug(`[SimulatedUser] Sleeping for ${targetProvider.delay}ms`);
            await (0, time_1.sleep)(targetProvider.delay);
        }
        logger_1.default.debug(`Agent: ${response.output}`);
        return [...messages, { role: 'assistant', content: response.output }];
    }
    async callApi(prompt, context, _callApiOptions) {
        (0, invariant_1.default)(context?.originalProvider, 'Expected originalProvider to be set');
        const instructions = (0, templates_1.getNunjucksEngine)().renderString(this.rawInstructions, context?.vars);
        const userProvider = new promptfoo_1.PromptfooSimulatedUserProvider({
            instructions,
        });
        logger_1.default.debug(`Formatted user instructions: ${instructions}`);
        let messages = [];
        const maxTurns = this.maxTurns;
        let numRequests = 0;
        for (let i = 0; i < maxTurns; i++) {
            const messagesToUser = await this.sendMessageToUser(messages, userProvider);
            const lastMessage = messagesToUser[messagesToUser.length - 1];
            if (lastMessage.content.includes('###STOP###')) {
                break;
            }
            const messagesToAgent = await this.sendMessageToAgent(messagesToUser, context.originalProvider, prompt);
            messages = messagesToAgent;
            numRequests += 1; // Only count the request to the agent.
        }
        return {
            output: messages
                .map((message) => `${message.role === 'assistant' ? 'Assistant' : 'User'}: ${message.content}`)
                .join('\n---\n'),
            tokenUsage: {
                numRequests,
            },
            metadata: {
                messages,
            },
        };
    }
    toString() {
        return 'AgentProvider';
    }
}
exports.SimulatedUser = SimulatedUser;
//# sourceMappingURL=simulatedUser.js.map