import type { ApiModerationProvider, ApiProvider, CallApiContextParams, CallApiOptionsParams, ProviderModerationResponse, ProviderResponse } from '../types';
import type { EnvOverrides } from '../types/env';
interface ReplicateCompletionOptions {
    apiKey?: string;
    temperature?: number;
    max_length?: number;
    max_new_tokens?: number;
    max_tokens?: number;
    top_p?: number;
    top_k?: number;
    repetition_penalty?: number;
    system_prompt?: string;
    stop_sequences?: string;
    seed?: number;
    prompt?: {
        prefix?: string;
        suffix?: string;
    };
    [key: string]: any;
}
export declare class ReplicateProvider implements ApiProvider {
    modelName: string;
    apiKey?: string;
    config: ReplicateCompletionOptions;
    constructor(modelName: string, options?: {
        config?: ReplicateCompletionOptions;
        id?: string;
        env?: EnvOverrides;
    });
    id(): string;
    toString(): string;
    callApi(prompt: string): Promise<ProviderResponse>;
}
export declare const LLAMAGUARD_DESCRIPTIONS: {
    [key: string]: string;
};
export declare class ReplicateModerationProvider extends ReplicateProvider implements ApiModerationProvider {
    callModerationApi(prompt: string, assistant: string): Promise<ProviderModerationResponse>;
}
export declare const DefaultModerationProvider: ReplicateModerationProvider;
interface ReplicateImageOptions {
    width?: number;
    height?: number;
    refine?: string;
    apply_watermark?: boolean;
    num_inference_steps?: number;
}
export declare class ReplicateImageProvider extends ReplicateProvider {
    config: ReplicateImageOptions;
    constructor(modelName: string, options?: {
        config?: ReplicateImageOptions;
        id?: string;
        env?: EnvOverrides;
    });
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
export {};
//# sourceMappingURL=replicate.d.ts.map