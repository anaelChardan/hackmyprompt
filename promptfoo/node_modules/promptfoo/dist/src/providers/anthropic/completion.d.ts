import type { ProviderResponse } from '../../types';
import type { EnvOverrides } from '../../types/env';
import { AnthropicGenericProvider } from './generic';
import type { AnthropicCompletionOptions } from './types';
export declare class AnthropicCompletionProvider extends AnthropicGenericProvider {
    static ANTHROPIC_COMPLETION_MODELS: string[];
    config: AnthropicCompletionOptions;
    constructor(modelName: string, options?: {
        config?: AnthropicCompletionOptions;
        id?: string;
        env?: EnvOverrides;
    });
    callApi(prompt: string): Promise<ProviderResponse>;
}
//# sourceMappingURL=completion.d.ts.map