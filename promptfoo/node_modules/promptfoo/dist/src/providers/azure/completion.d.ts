import type { CallApiContextParams, CallApiOptionsParams, ProviderResponse } from '../../types';
import { AzureGenericProvider } from './generic';
export declare class AzureCompletionProvider extends AzureGenericProvider {
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
//# sourceMappingURL=completion.d.ts.map