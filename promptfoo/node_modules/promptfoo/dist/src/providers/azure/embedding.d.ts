import type { ProviderEmbeddingResponse } from '../../types';
import { AzureGenericProvider } from './generic';
export declare class AzureEmbeddingProvider extends AzureGenericProvider {
    callEmbeddingApi(text: string): Promise<ProviderEmbeddingResponse>;
}
//# sourceMappingURL=embedding.d.ts.map