import type { ApiProvider, CallApiContextParams, CallApiOptionsParams, ProviderEmbeddingResponse, ProviderResponse } from '../types';
import type { EnvOverrides } from '../types/env';
export type ICloudflareProviderBaseConfig = {
    accountId?: string;
    accountIdEnvar?: string;
    apiKey?: string;
    apiKeyEnvar?: string;
    apiBaseUrl?: string;
};
export type ICloudflareTextGenerationOptions = {
    frequency_penalty?: number;
    lora?: number;
    max_tokens?: number;
    presence_penalty?: number;
    repetition_penalty?: number;
    seed?: number;
    temperature?: number;
    top_k?: number;
    top_p?: number;
};
export type ICloudflareProviderConfig = ICloudflareProviderBaseConfig & ICloudflareTextGenerationOptions;
export type ICloudflareSuccessResponse<SuccessData extends Record<string, unknown>> = {
    success: true;
    errors: [];
    messages: unknown[];
    result: SuccessData;
};
export type IBuildCloudflareResponse<SuccessData extends Record<string, unknown>> = ICloudflareSuccessResponse<SuccessData> | {
    success: false;
    errors: unknown[];
    messages: unknown[];
};
declare abstract class CloudflareAiGenericProvider implements ApiProvider {
    abstract readonly modelType: 'embedding' | 'chat' | 'completion';
    deploymentName: string;
    readonly config: ICloudflareProviderConfig;
    env?: EnvOverrides;
    constructor(deploymentName: string, options?: {
        config?: ICloudflareProviderConfig;
        id?: string;
        env?: EnvOverrides;
    });
    getApiConfig(): {
        accountId: string;
        apiToken: string;
    };
    /**
     * @see https://developers.cloudflare.com/api/operations/workers-ai-post-run-model
     */
    getApiBaseUrl(): string;
    /**
     * @see https://developers.cloudflare.com/api/operations/workers-ai-post-run-model
     */
    buildUrl(): string;
    id(): string;
    toString(): string;
    protected buildApiHeaders(): {
        Authorization: `Bearer ${string}`;
        'Content-Type': 'application/json';
    };
    /**
     * Cloudflare does not report usage but if it starts to pipe it through its response we can
     * fill in this implementation
     */
    protected getTokenUsageFromResponse(_response: IBuildCloudflareResponse<Record<string, unknown>>): ProviderEmbeddingResponse['tokenUsage'];
    /**
     * Handles the actual marshalling of Cloudflare API response data into the response types expected
     * by inheriting consumers
     *
     * This is meant to be used internally across the inheriting providers
     * @param body
     * @returns
     */
    protected handleApiCall<InitialResponse extends IBuildCloudflareResponse<Record<string, unknown>>, SuccessResponse extends InitialResponse = InitialResponse extends ICloudflareSuccessResponse<Record<string, unknown>> ? InitialResponse : never>(body: Record<string, unknown>): Promise<{
        data: SuccessResponse;
        cached: boolean;
        tokenUsage: ProviderEmbeddingResponse['tokenUsage'];
    } | {
        error: string;
    }>;
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
type IEmbeddingsResponse = {
    shape: [number, number];
    data: number[][];
};
export type ICloudflareEmbeddingResponse = IBuildCloudflareResponse<IEmbeddingsResponse>;
export declare class CloudflareAiEmbeddingProvider extends CloudflareAiGenericProvider {
    readonly modelType = "embedding";
    callEmbeddingApi(text: string): Promise<ProviderEmbeddingResponse>;
}
export type ICloudflareTextGenerationResponse = IBuildCloudflareResponse<{
    response: string;
}>;
export declare class CloudflareAiCompletionProvider extends CloudflareAiGenericProvider {
    readonly modelType = "completion";
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
export declare class CloudflareAiChatCompletionProvider extends CloudflareAiGenericProvider {
    readonly modelType = "chat";
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
export {};
//# sourceMappingURL=cloudflare-ai.d.ts.map