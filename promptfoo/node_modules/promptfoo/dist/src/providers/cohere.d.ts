import type { ApiProvider, ProviderResponse, ApiEmbeddingProvider, ProviderEmbeddingResponse } from '../types';
import type { EnvOverrides } from '../types/env';
interface CohereChatOptions {
    apiKey?: string;
    modelName?: string;
    chatHistory?: Array<{
        role: string;
        message: string;
        user_name?: string;
        conversation_id?: string;
    }>;
    connectors?: Array<{
        id: string;
        user_access_token?: string;
        continue_on_failure?: boolean;
        options?: object;
    }>;
    preamble_override?: string;
    prompt_truncation?: 'AUTO' | 'OFF';
    search_queries_only?: boolean;
    documents?: Array<{
        id: string;
        citation_quality?: 'accurate' | 'fast';
    }>;
    temperature?: number;
    max_tokens?: number;
    k?: number;
    p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    showDocuments?: boolean;
    showSearchQueries?: boolean;
}
export declare class CohereChatCompletionProvider implements ApiProvider {
    static COHERE_CHAT_MODELS: string[];
    config: CohereChatOptions;
    private apiKey;
    private modelName;
    constructor(modelName: string, options?: {
        config?: CohereChatOptions;
        id?: string;
        env?: EnvOverrides;
    });
    id(): string;
    callApi(prompt: string): Promise<ProviderResponse>;
}
export declare class CohereEmbeddingProvider implements ApiEmbeddingProvider {
    modelName: string;
    config: any;
    env?: any;
    constructor(modelName: string, config?: any, env?: any);
    id(): string;
    getApiKey(): string | undefined;
    getApiUrl(): string;
    callApi(): Promise<ProviderResponse>;
    callEmbeddingApi(input: string): Promise<ProviderEmbeddingResponse>;
}
export {};
//# sourceMappingURL=cohere.d.ts.map