import type { ApiProvider, ProviderEmbeddingResponse, ProviderResponse } from '../types';
import type { EnvOverrides } from '../types/env';
interface MistralChatCompletionOptions {
    apiKey?: string;
    apiKeyEnvar?: string;
    apiHost?: string;
    apiBaseUrl?: string;
    temperature?: number;
    top_p?: number;
    max_tokens?: number;
    safe_prompt?: boolean;
    random_seed?: number;
    response_format?: {
        type: 'json_object';
    };
    cost?: number;
}
export declare class MistralChatCompletionProvider implements ApiProvider {
    modelName: string;
    config: MistralChatCompletionOptions;
    env?: EnvOverrides;
    static MISTRAL_CHAT_MODELS: {
        id: string;
        cost: {
            input: number;
            output: number;
        };
    }[];
    static MISTRAL_CHAT_MODELS_NAMES: string[];
    constructor(modelName: string, options?: {
        id?: string;
        config?: MistralChatCompletionOptions;
        env?: EnvOverrides;
    });
    id(): string;
    toString(): string;
    getApiUrlDefault(): string;
    getApiUrl(): string;
    getApiKey(): string | undefined;
    callApi(prompt: string): Promise<ProviderResponse>;
}
export declare class MistralEmbeddingProvider implements ApiProvider {
    modelName: string;
    config: MistralChatCompletionOptions;
    env?: EnvOverrides;
    constructor(options?: {
        config?: MistralChatCompletionOptions;
        id?: string;
        env?: EnvOverrides;
    });
    id(): string;
    toString(): string;
    getApiUrlDefault(): string;
    getApiUrl(): string;
    getApiKey(): string | undefined;
    callApi(text: string): Promise<ProviderResponse>;
    callEmbeddingApi(text: string): Promise<ProviderEmbeddingResponse>;
}
export {};
//# sourceMappingURL=mistral.d.ts.map