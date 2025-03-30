"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EchoProvider = void 0;
const time_1 = require("../util/time");
class EchoProvider {
    constructor(options = {}) {
        this.options = options;
        this.id = options.id ? () => options.id : this.id;
        this.label = options.label;
        this.config = options.config;
        this.delay = options.delay;
    }
    id() {
        return 'echo';
    }
    toString() {
        return '[Echo Provider]';
    }
    async callApi(input, options, context) {
        if (this.delay && this.delay > 0) {
            await (0, time_1.sleep)(this.delay);
        }
        // Create a complete ProviderResponse object
        const response = {
            output: input,
            raw: input,
            cost: 0,
            cached: false,
            tokenUsage: {
                total: 0,
                prompt: 0,
                completion: 0,
            },
            isRefusal: false,
            metadata: context?.metadata || {},
        };
        return response;
    }
}
exports.EchoProvider = EchoProvider;
//# sourceMappingURL=echo.js.map