import { OpenAiGenericProvider } from '.';
import type { CallApiContextParams, CallApiOptionsParams, ProviderResponse } from '../../types';
import type { EnvOverrides } from '../../types/env';
import type { OpenAiCompletionOptions } from './types';
export declare class OpenAiCompletionProvider extends OpenAiGenericProvider {
    static OPENAI_COMPLETION_MODELS: ({
        id: string;
        cost: {
            input: number;
            output: number;
        };
    } | {
        id: string;
        cost?: undefined;
    })[];
    static OPENAI_COMPLETION_MODEL_NAMES: string[];
    config: OpenAiCompletionOptions;
    constructor(modelName: string, options?: {
        config?: OpenAiCompletionOptions;
        id?: string;
        env?: EnvOverrides;
    });
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
//# sourceMappingURL=completion.d.ts.map