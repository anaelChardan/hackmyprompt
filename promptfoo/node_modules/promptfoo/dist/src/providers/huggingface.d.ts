import type { ApiProvider, ApiSimilarityProvider, ProviderClassificationResponse, ProviderEmbeddingResponse, ProviderResponse, ProviderSimilarityResponse } from '../types';
interface HuggingfaceProviderOptions {
    apiKey?: string;
    apiEndpoint?: string;
}
type HuggingfaceTextGenerationOptions = HuggingfaceProviderOptions & {
    top_k?: number;
    top_p?: number;
    temperature?: number;
    repetition_penalty?: number;
    max_new_tokens?: number;
    max_time?: number;
    return_full_text?: boolean;
    num_return_sequences?: number;
    do_sample?: boolean;
    use_cache?: boolean;
    wait_for_model?: boolean;
};
export declare class HuggingfaceTextGenerationProvider implements ApiProvider {
    modelName: string;
    config: HuggingfaceTextGenerationOptions;
    constructor(modelName: string, options?: {
        id?: string;
        config?: HuggingfaceTextGenerationOptions;
    });
    id(): string;
    toString(): string;
    getApiKey(): string | undefined;
    getConfig(): Partial<Record<"temperature" | "top_p" | "top_k" | "max_new_tokens" | "repetition_penalty" | keyof HuggingfaceProviderOptions | "max_time" | "return_full_text" | "num_return_sequences" | "do_sample" | "use_cache" | "wait_for_model", string | number | boolean | undefined>>;
    callApi(prompt: string): Promise<ProviderResponse>;
}
type HuggingfaceTextClassificationOptions = HuggingfaceProviderOptions;
export declare class HuggingfaceTextClassificationProvider implements ApiProvider {
    modelName: string;
    config: HuggingfaceTextClassificationOptions;
    constructor(modelName: string, options?: {
        id?: string;
        config?: HuggingfaceTextClassificationOptions;
    });
    id(): string;
    toString(): string;
    getApiKey(): string | undefined;
    callClassificationApi(prompt: string): Promise<ProviderClassificationResponse>;
    callApi(prompt: string): Promise<ProviderResponse>;
}
type HuggingfaceFeatureExtractionOptions = HuggingfaceProviderOptions & {
    use_cache?: boolean;
    wait_for_model?: boolean;
};
export declare class HuggingfaceFeatureExtractionProvider implements ApiProvider {
    modelName: string;
    config: HuggingfaceFeatureExtractionOptions;
    constructor(modelName: string, options?: {
        id?: string;
        config?: HuggingfaceFeatureExtractionOptions;
    });
    id(): string;
    toString(): string;
    getApiKey(): string | undefined;
    callApi(): Promise<ProviderResponse>;
    callEmbeddingApi(text: string): Promise<ProviderEmbeddingResponse>;
}
type HuggingfaceSentenceSimilarityOptions = HuggingfaceProviderOptions & {
    use_cache?: boolean;
    wait_for_model?: boolean;
};
export declare class HuggingfaceSentenceSimilarityProvider implements ApiSimilarityProvider {
    modelName: string;
    config: HuggingfaceSentenceSimilarityOptions;
    constructor(modelName: string, options?: {
        id?: string;
        config?: HuggingfaceSentenceSimilarityOptions;
    });
    id(): string;
    getApiKey(): string | undefined;
    toString(): string;
    callApi(): Promise<ProviderResponse>;
    callSimilarityApi(expected: string, input: string): Promise<ProviderSimilarityResponse>;
}
type HuggingfaceTokenClassificationOptions = HuggingfaceProviderOptions & {
    aggregation_strategy?: string;
    use_cache?: boolean;
    wait_for_model?: boolean;
};
export declare class HuggingfaceTokenExtractionProvider implements ApiProvider {
    modelName: string;
    config: HuggingfaceTokenClassificationOptions;
    constructor(modelName: string, options?: {
        id?: string;
        config?: HuggingfaceTokenClassificationOptions;
    });
    id(): string;
    getApiKey(): string | undefined;
    callClassificationApi(input: string): Promise<ProviderClassificationResponse>;
    callApi(prompt: string): Promise<ProviderResponse>;
}
export {};
//# sourceMappingURL=huggingface.d.ts.map