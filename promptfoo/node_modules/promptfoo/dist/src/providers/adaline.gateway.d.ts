import { Gateway } from '@adaline/gateway';
import type { Cache as GatewayCache } from '@adaline/gateway';
import type { ToolType as GatewayToolType, ResponseSchemaType as GatewayResponseSchemaType } from '@adaline/types';
import type { ApiProvider, CallApiContextParams, CallApiOptionsParams, ProviderEmbeddingResponse, ProviderOptions, ProviderResponse } from '../types';
import type { EnvOverrides } from '../types/env';
import type { OpenAiCompletionOptions } from './openai/types';
declare class AdalineGatewayCachePlugin<T> implements GatewayCache<T> {
    get(key: string): Promise<T | undefined>;
    set(key: string, value: T): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
}
declare class AdalineGateway {
    gateway: Gateway | undefined;
    getGateway(): Gateway;
}
declare const adalineGateway: AdalineGateway;
interface GatewayBaseOptions {
    apiKey?: string;
    apiKeyEnvar?: string;
    apiHost?: string;
    apiBaseUrl?: string;
    cost?: number;
    headers?: {
        [key: string]: string;
    };
    organization?: string;
    azureClientId?: string;
    azureClientSecret?: string;
    azureTenantId?: string;
    azureAuthorityHost?: string;
    azureTokenScope?: string;
}
type GatewayChatOptions = GatewayBaseOptions & {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    topK?: number;
    minP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    repetitionPenalty?: number;
    stop?: string[];
    seed?: number;
    logProbs?: boolean;
    toolChoice?: string;
    tools?: GatewayToolType[];
    responseFormat?: 'text' | 'json_object' | 'json_schema';
    responseSchema?: GatewayResponseSchemaType;
    safetySettings?: {
        category: string;
        threshold: string;
    }[];
};
export declare class AdalineGatewayGenericProvider implements ApiProvider {
    gateway: Gateway;
    modelName: string;
    providerName: string;
    env?: EnvOverrides;
    config: GatewayBaseOptions | OpenAiCompletionOptions;
    providerOptions: ProviderOptions;
    constructor(providerName: string, modelName: string, options?: {
        config?: GatewayBaseOptions | OpenAiCompletionOptions;
        id?: string;
        env?: EnvOverrides;
    });
    id(): string;
    toString(): string;
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
export declare class AdalineGatewayEmbeddingProvider extends AdalineGatewayGenericProvider {
    callEmbeddingApi(text: string): Promise<ProviderEmbeddingResponse>;
}
export declare class AdalineGatewayChatProvider extends AdalineGatewayGenericProvider {
    config: GatewayChatOptions | OpenAiCompletionOptions;
    constructor(providerName: string, modelName: string, options?: {
        config?: GatewayChatOptions | OpenAiCompletionOptions;
        id?: string;
        env?: EnvOverrides;
    });
    checkRequestFormat(prompt: string): {
        formatType: 'gateway' | 'openai';
    };
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
export { AdalineGatewayCachePlugin, adalineGateway };
//# sourceMappingURL=adaline.gateway.d.ts.map