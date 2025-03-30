import type { ProviderOptions } from '../types/providers';
import { OpenAiChatCompletionProvider } from './openai/chat';
import type { OpenAiCompletionOptions } from './openai/types';
type DatabricksMosaicAiCompletionOptions = OpenAiCompletionOptions & {
    workspaceUrl?: string;
};
export type DatabricksMosaicAiProviderOptions = ProviderOptions & {
    config: DatabricksMosaicAiCompletionOptions;
};
export declare class DatabricksMosaicAiChatCompletionProvider extends OpenAiChatCompletionProvider {
    constructor(modelName: string, providerOptions: DatabricksMosaicAiProviderOptions);
}
export {};
//# sourceMappingURL=databricks.d.ts.map