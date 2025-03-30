import { OpenAiGenericProvider } from '.';
import type { CallApiContextParams, CallApiOptionsParams, ProviderResponse } from '../../types';
import type { EnvOverrides } from '../../types/env';
import type { OpenAiCompletionOptions } from './types';
export declare class OpenAiResponsesProvider extends OpenAiGenericProvider {
    static OPENAI_RESPONSES_MODEL_NAMES: string[];
    config: OpenAiCompletionOptions;
    constructor(modelName: string, options?: {
        config?: OpenAiCompletionOptions;
        id?: string;
        env?: EnvOverrides;
    });
    protected isReasoningModel(): boolean;
    protected supportsTemperature(): boolean;
    getOpenAiBody(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): {
        body: any;
        config: any;
    };
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
//# sourceMappingURL=responses.d.ts.map