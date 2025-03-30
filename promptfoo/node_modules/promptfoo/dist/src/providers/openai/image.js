"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAiImageProvider = exports.DALLE3_COSTS = exports.DALLE2_COSTS = exports.DEFAULT_SIZE = exports.DALLE3_VALID_SIZES = exports.DALLE2_VALID_SIZES = void 0;
exports.validateSizeForModel = validateSizeForModel;
exports.formatOutput = formatOutput;
exports.prepareRequestBody = prepareRequestBody;
exports.calculateImageCost = calculateImageCost;
exports.callOpenAiImageApi = callOpenAiImageApi;
exports.processApiResponse = processApiResponse;
const _1 = require(".");
const cache_1 = require("../../cache");
const logger_1 = __importDefault(require("../../logger"));
const text_1 = require("../../util/text");
const shared_1 = require("../shared");
const util_1 = require("./util");
exports.DALLE2_VALID_SIZES = ['256x256', '512x512', '1024x1024'];
exports.DALLE3_VALID_SIZES = ['1024x1024', '1792x1024', '1024x1792'];
exports.DEFAULT_SIZE = '1024x1024';
exports.DALLE2_COSTS = {
    '256x256': 0.016,
    '512x512': 0.018,
    '1024x1024': 0.02,
};
exports.DALLE3_COSTS = {
    standard_1024x1024: 0.04,
    standard_1024x1792: 0.08,
    standard_1792x1024: 0.08,
    hd_1024x1024: 0.08,
    hd_1024x1792: 0.12,
    hd_1792x1024: 0.12,
};
function validateSizeForModel(size, model) {
    if (model === 'dall-e-3' && !exports.DALLE3_VALID_SIZES.includes(size)) {
        return {
            valid: false,
            message: `Invalid size "${size}" for DALL-E 3. Valid sizes are: ${exports.DALLE3_VALID_SIZES.join(', ')}`,
        };
    }
    if (model === 'dall-e-2' && !exports.DALLE2_VALID_SIZES.includes(size)) {
        return {
            valid: false,
            message: `Invalid size "${size}" for DALL-E 2. Valid sizes are: ${exports.DALLE2_VALID_SIZES.join(', ')}`,
        };
    }
    return { valid: true };
}
function formatOutput(data, prompt, responseFormat) {
    if (responseFormat === 'b64_json') {
        const b64Json = data.data[0].b64_json;
        if (!b64Json) {
            return { error: `No base64 image data found in response: ${JSON.stringify(data)}` };
        }
        return JSON.stringify(data);
    }
    else {
        const url = data.data[0].url;
        if (!url) {
            return { error: `No image URL found in response: ${JSON.stringify(data)}` };
        }
        const sanitizedPrompt = prompt
            .replace(/\r?\n|\r/g, ' ')
            .replace(/\[/g, '(')
            .replace(/\]/g, ')');
        const ellipsizedPrompt = (0, text_1.ellipsize)(sanitizedPrompt, 50);
        return `![${ellipsizedPrompt}](${url})`;
    }
}
function prepareRequestBody(model, prompt, size, responseFormat, config) {
    const body = {
        model,
        prompt,
        n: config.n || 1,
        size,
        response_format: responseFormat,
    };
    if (model === 'dall-e-3') {
        if ('quality' in config && config.quality) {
            body.quality = config.quality;
        }
        if ('style' in config && config.style) {
            body.style = config.style;
        }
    }
    return body;
}
function calculateImageCost(model, size, quality, n = 1) {
    const imageQuality = quality || 'standard';
    if (model === 'dall-e-3') {
        const costKey = `${imageQuality}_${size}`;
        const costPerImage = exports.DALLE3_COSTS[costKey] || exports.DALLE3_COSTS['standard_1024x1024'];
        return costPerImage * n;
    }
    else if (model === 'dall-e-2') {
        const costPerImage = exports.DALLE2_COSTS[size] || exports.DALLE2_COSTS['1024x1024'];
        return costPerImage * n;
    }
    return 0.04 * n;
}
async function callOpenAiImageApi(url, body, headers, timeout) {
    return await (0, cache_1.fetchWithCache)(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    }, timeout);
}
async function processApiResponse(data, prompt, responseFormat, cached, model, size, quality, n = 1) {
    if (data.error) {
        await data?.deleteFromCache?.();
        return {
            error: (0, util_1.formatOpenAiError)(data),
        };
    }
    try {
        const formattedOutput = formatOutput(data, prompt, responseFormat);
        if (typeof formattedOutput === 'object') {
            return formattedOutput;
        }
        const cost = cached ? 0 : calculateImageCost(model, size, quality, n);
        return {
            output: formattedOutput,
            cached,
            cost,
            ...(responseFormat === 'b64_json' ? { isBase64: true, format: 'json' } : {}),
        };
    }
    catch (err) {
        await data?.deleteFromCache?.();
        return {
            error: `API error: ${String(err)}: ${JSON.stringify(data)}`,
        };
    }
}
class OpenAiImageProvider extends _1.OpenAiGenericProvider {
    constructor(modelName, options = {}) {
        super(modelName, options);
        this.config = options.config || {};
    }
    async callApi(prompt, context, callApiOptions) {
        if (this.requiresApiKey() && !this.getApiKey()) {
            throw new Error('OpenAI API key is not set. Set the OPENAI_API_KEY environment variable or add `apiKey` to the provider config.');
        }
        const config = {
            ...this.config,
            ...context?.prompt?.config,
        };
        const model = config.model || this.modelName;
        const operation = ('operation' in config && config.operation) || 'generation';
        const responseFormat = config.response_format || 'url';
        if (operation !== 'generation') {
            return {
                error: `Only 'generation' operations are currently supported. '${operation}' operations are not implemented.`,
            };
        }
        const endpoint = '/images/generations';
        const size = config.size || exports.DEFAULT_SIZE;
        const sizeValidation = validateSizeForModel(size, model);
        if (!sizeValidation.valid) {
            return { error: sizeValidation.message };
        }
        const body = prepareRequestBody(model, prompt, size, responseFormat, config);
        logger_1.default.debug(`Calling OpenAI Image API: ${JSON.stringify(body)}`);
        const headers = {
            'Content-Type': 'application/json',
            ...(this.getApiKey() ? { Authorization: `Bearer ${this.getApiKey()}` } : {}),
            ...(this.getOrganization() ? { 'OpenAI-Organization': this.getOrganization() } : {}),
            ...config.headers,
        };
        let data, status, statusText;
        let cached = false;
        try {
            ({ data, cached, status, statusText } = await callOpenAiImageApi(`${this.getApiUrl()}${endpoint}`, body, headers, shared_1.REQUEST_TIMEOUT_MS));
            if (status < 200 || status >= 300) {
                return {
                    error: `API error: ${status} ${statusText}\n${typeof data === 'string' ? data : JSON.stringify(data)}`,
                };
            }
        }
        catch (err) {
            logger_1.default.error(`API call error: ${String(err)}`);
            await data?.deleteFromCache?.();
            return {
                error: `API call error: ${String(err)}`,
            };
        }
        logger_1.default.debug(`\tOpenAI image API response: ${JSON.stringify(data)}`);
        return processApiResponse(data, prompt, responseFormat, cached, model, size, config.quality, config.n || 1);
    }
}
exports.OpenAiImageProvider = OpenAiImageProvider;
//# sourceMappingURL=image.js.map