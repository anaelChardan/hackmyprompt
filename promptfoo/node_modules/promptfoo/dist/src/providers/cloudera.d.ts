import type { ProviderOptions } from '../types/providers';
import { OpenAiChatCompletionProvider } from './openai/chat';
import type { OpenAiCompletionOptions } from './openai/types';
type ClouderaAiCompletionOptions = OpenAiCompletionOptions & {
    domain?: string;
    namespace?: string;
    endpoint?: string;
};
type ClouderaAiProviderOptions = ProviderOptions & {
    config: ClouderaAiCompletionOptions;
};
export declare class ClouderaAiChatCompletionProvider extends OpenAiChatCompletionProvider {
    constructor(modelName: string, providerOptions: ClouderaAiProviderOptions);
}
export {};
//# sourceMappingURL=cloudera.d.ts.map