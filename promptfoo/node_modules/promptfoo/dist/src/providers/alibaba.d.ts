import type { ProviderOptions } from '../types';
import { OpenAiChatCompletionProvider } from './openai/chat';
import { OpenAiEmbeddingProvider } from './openai/embedding';
export declare class AlibabaChatCompletionProvider extends OpenAiChatCompletionProvider {
    constructor(modelName: string, options?: ProviderOptions);
}
export declare class AlibabaEmbeddingProvider extends OpenAiEmbeddingProvider {
    constructor(modelName: string, options?: ProviderOptions);
}
//# sourceMappingURL=alibaba.d.ts.map