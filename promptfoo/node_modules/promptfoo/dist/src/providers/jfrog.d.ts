import type { ProviderOptions } from '../types/providers';
import { OpenAiChatCompletionProvider } from './openai/chat';
import type { OpenAiCompletionOptions } from './openai/types';
type JfrogMlCompletionOptions = OpenAiCompletionOptions & {
    baseUrl?: string;
};
type JfrogMlProviderOptions = ProviderOptions & {
    config?: JfrogMlCompletionOptions;
};
export declare class JfrogMlChatCompletionProvider extends OpenAiChatCompletionProvider {
    constructor(modelName: string, providerOptions: JfrogMlProviderOptions);
}
export {};
//# sourceMappingURL=jfrog.d.ts.map