import Anthropic from '@anthropic-ai/sdk';
import type { ApiProvider, ProviderResponse } from '../../types';
import type { EnvOverrides } from '../../types/env';
/**
 * Base options shared by all Anthropic provider implementations
 */
export interface AnthropicBaseOptions {
    apiKey?: string;
    apiBaseUrl?: string;
    headers?: Record<string, string>;
    cost?: number;
}
/**
 * Generic provider class for Anthropic APIs
 * Serves as a base class with shared functionality for all Anthropic providers
 */
export declare class AnthropicGenericProvider implements ApiProvider {
    modelName: string;
    config: AnthropicBaseOptions;
    env?: EnvOverrides;
    apiKey?: string;
    anthropic: Anthropic;
    constructor(modelName: string, options?: {
        config?: AnthropicBaseOptions;
        id?: string;
        env?: EnvOverrides;
    });
    id(): string;
    toString(): string;
    getApiKey(): string | undefined;
    getApiBaseUrl(): string | undefined;
    /**
     * Base implementation - should be overridden by specific provider implementations
     */
    callApi(prompt: string): Promise<ProviderResponse>;
}
//# sourceMappingURL=generic.d.ts.map