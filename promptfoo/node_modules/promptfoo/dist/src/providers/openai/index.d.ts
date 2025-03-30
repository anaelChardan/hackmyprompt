import type { ApiProvider, CallApiContextParams, CallApiOptionsParams, ProviderResponse } from '../../types';
import type { EnvOverrides } from '../../types/env';
import type { OpenAiSharedOptions } from './types';
export declare class OpenAiGenericProvider implements ApiProvider {
    modelName: string;
    config: OpenAiSharedOptions;
    env?: EnvOverrides;
    constructor(modelName: string, options?: {
        config?: OpenAiSharedOptions;
        id?: string;
        env?: EnvOverrides;
    });
    id(): string;
    toString(): string;
    getOrganization(): string | undefined;
    getApiUrlDefault(): string;
    getApiUrl(): string;
    getApiKey(): string | undefined;
    requiresApiKey(): boolean;
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
//# sourceMappingURL=index.d.ts.map