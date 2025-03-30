import type { TokenCredential } from '@azure/identity';
import type { ApiProvider, CallApiContextParams, CallApiOptionsParams, ProviderResponse } from '../../types';
import type { EnvOverrides } from '../../types/env';
import type { AzureCompletionOptions, AzureProviderOptions } from './types';
export declare class AzureGenericProvider implements ApiProvider {
    deploymentName: string;
    apiHost?: string;
    apiBaseUrl?: string;
    config: AzureCompletionOptions;
    env?: EnvOverrides;
    authHeaders?: Record<string, string>;
    protected initializationPromise: Promise<void> | null;
    constructor(deploymentName: string, options?: AzureProviderOptions);
    initialize(): Promise<void>;
    ensureInitialized(): Promise<void>;
    getApiKey(): string | undefined;
    getApiKeyOrThrow(): string;
    getAzureTokenCredential(): Promise<TokenCredential>;
    getAccessToken(): Promise<string>;
    getAuthHeaders(): Promise<Record<string, string>>;
    getApiBaseUrl(): string | undefined;
    id(): string;
    toString(): string;
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
//# sourceMappingURL=generic.d.ts.map