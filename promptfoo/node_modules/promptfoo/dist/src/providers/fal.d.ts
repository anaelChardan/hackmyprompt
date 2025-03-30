import type { ApiProvider, CallApiContextParams, ProviderResponse } from '../types';
import type { EnvOverrides } from '../types/env';
type FalProviderOptions = {
    apiKey?: string;
};
declare class FalProvider<Input = any> implements ApiProvider {
    modelName: string;
    modelType: 'image';
    apiKey?: string;
    config: FalProviderOptions;
    input: Input;
    private fal;
    constructor(modelType: 'image', modelName: string, options?: {
        config?: FalProviderOptions;
        id?: string;
        env?: EnvOverrides;
    });
    id(): string;
    toString(): string;
    callApi(prompt: string, context?: CallApiContextParams): Promise<ProviderResponse>;
    runInference<Result = any>(input: Input): Promise<Result>;
}
type FalImageGenerationOptions = FalProviderOptions & {
    seed?: number;
    num_inference_steps?: number;
    guidance_scale?: number;
    image_size?: {
        width: number;
        height: number;
    };
};
type FalImageGenerationInput = FalImageGenerationOptions & {
    prompt: string;
};
export declare class FalImageGenerationProvider extends FalProvider<FalImageGenerationInput> {
    constructor(modelName: string, options?: {
        config?: FalImageGenerationOptions;
        id?: string;
        env?: EnvOverrides;
    });
    toString(): string;
    runInference<Result = string>(input: FalImageGenerationInput): Promise<Result>;
    protected resolveImageUrl(output: any): string;
}
export {};
//# sourceMappingURL=fal.d.ts.map