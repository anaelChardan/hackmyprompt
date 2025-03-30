"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketProvider = void 0;
exports.createTransformResponse = createTransformResponse;
const ws_1 = __importDefault(require("ws"));
const logger_1 = __importDefault(require("../logger"));
const invariant_1 = __importDefault(require("../util/invariant"));
const json_1 = require("../util/json");
const templates_1 = require("../util/templates");
const nunjucks = (0, templates_1.getNunjucksEngine)();
function createTransformResponse(parser) {
    if (typeof parser === 'function') {
        return parser;
    }
    if (typeof parser === 'string') {
        return new Function('data', `return ${parser}`);
    }
    return (data) => ({ output: data });
}
class WebSocketProvider {
    constructor(url, options) {
        this.config = options.config;
        this.url = this.config.url || url;
        this.transformResponse = createTransformResponse(this.config.transformResponse || this.config.responseParser);
        (0, invariant_1.default)(this.config.messageTemplate, `Expected WebSocket provider ${this.url} to have a config containing {messageTemplate}, but got ${(0, json_1.safeJsonStringify)(this.config)}`);
    }
    id() {
        return this.url;
    }
    toString() {
        return `[WebSocket Provider ${this.url}]`;
    }
    async callApi(prompt, context) {
        const vars = {
            ...(context?.vars || {}),
            prompt,
        };
        const message = nunjucks.renderString(this.config.messageTemplate, vars);
        logger_1.default.debug(`Sending WebSocket message to ${this.url}: ${message}`);
        return new Promise((resolve) => {
            const ws = new ws_1.default(this.url);
            const timeout = setTimeout(() => {
                ws.close();
                resolve({ error: 'WebSocket request timed out' });
            }, this.config.timeoutMs || 10000);
            ws.onmessage = (event) => {
                clearTimeout(timeout);
                logger_1.default.debug(`Received WebSocket response: ${event.data}`);
                try {
                    let data = event.data;
                    if (typeof data === 'string') {
                        try {
                            data = JSON.parse(data);
                        }
                        catch {
                            // If parsing fails, assume it's a text response
                        }
                    }
                    resolve({ output: this.transformResponse(data) });
                }
                catch (err) {
                    resolve({ error: `Failed to process response: ${JSON.stringify(err)}` });
                }
                ws.close();
            };
            ws.onerror = (err) => {
                clearTimeout(timeout);
                resolve({ error: `WebSocket error: ${JSON.stringify(err)}` });
            };
            ws.onopen = () => {
                ws.send(message);
            };
        });
    }
}
exports.WebSocketProvider = WebSocketProvider;
//# sourceMappingURL=websocket.js.map