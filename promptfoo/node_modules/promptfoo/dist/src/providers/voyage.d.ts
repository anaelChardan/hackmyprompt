import type { ApiEmbeddingProvider, ProviderResponse, ProviderEmbeddingResponse } from '../types';
export declare class VoyageEmbeddingProvider implements ApiEmbeddingProvider {
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
//# sourceMappingURL=voyage.d.ts.map