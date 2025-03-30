import { OpenAiGenericProvider } from '.';
import type { CallApiContextParams, CallApiOptionsParams, ProviderResponse } from '../../types';
import type { EnvOverrides } from '../../types/env';
import type { OpenAiSharedOptions } from './types';
export type OpenAiImageModel = 'dall-e-2' | 'dall-e-3';
export type OpenAiImageOperation = 'generation' | 'variation' | 'edit';
export type DallE2Size = '256x256' | '512x512' | '1024x1024';
export type DallE3Size = '1024x1024' | '1792x1024' | '1024x1792';
export declare const DALLE2_VALID_SIZES: DallE2Size[];
export declare const DALLE3_VALID_SIZES: DallE3Size[];
export declare const DEFAULT_SIZE = "1024x1024";
export declare const DALLE2_COSTS: Record<DallE2Size, number>;
export declare const DALLE3_COSTS: Record<string, number>;
type CommonImageOptions = {
    n?: number;
    response_format?: 'url' | 'b64_json';
};
type DallE3Options = CommonImageOptions & {
    size?: DallE3Size;
    quality?: 'standard' | 'hd';
    style?: 'natural' | 'vivid';
};
type DallE2Options = CommonImageOptions & {
    size?: DallE2Size;
    image?: string;
    mask?: string;
    operation?: OpenAiImageOperation;
};
type OpenAiImageOptions = OpenAiSharedOptions & {
    model?: OpenAiImageModel;
} & (DallE2Options | DallE3Options);
export declare function validateSizeForModel(size: string, model: string): {
    valid: boolean;
    message?: string;
};
export declare function formatOutput(data: any, prompt: string, responseFormat?: string): string | {
    error: string;
};
export declare function prepareRequestBody(model: string, prompt: string, size: string, responseFormat: string, config: any): Record<string, any>;
export declare function calculateImageCost(model: string, size: string, quality?: string, n?: number): number;
export declare function callOpenAiImageApi(url: string, body: Record<string, any>, headers: Record<string, string>, timeout: number): Promise<{
    data: any;
    cached: boolean;
    status: number;
    statusText: string;
}>;
export declare function processApiResponse(data: any, prompt: string, responseFormat: string, cached: boolean, model: string, size: string, quality?: string, n?: number): Promise<ProviderResponse>;
export declare class OpenAiImageProvider extends OpenAiGenericProvider {
    config: OpenAiImageOptions;
    constructor(modelName: string, options?: {
        config?: OpenAiImageOptions;
        id?: string;
        env?: EnvOverrides;
    });
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
export {};
//# sourceMappingURL=image.d.ts.map