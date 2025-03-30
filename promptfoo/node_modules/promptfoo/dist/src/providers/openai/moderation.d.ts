import { OpenAiGenericProvider } from '.';
import type { ApiModerationProvider, ProviderModerationResponse } from '../../types';
export declare const OPENAI_MODERATION_MODELS: {
    id: string;
    maxTokens: number;
    capabilities: string[];
}[];
export type OpenAIModerationModelId = string;
export type ModerationCategory = 'sexual' | 'sexual/minors' | 'harassment' | 'harassment/threatening' | 'hate' | 'hate/threatening' | 'illicit' | 'illicit/violent' | 'self-harm' | 'self-harm/intent' | 'self-harm/instructions' | 'violence' | 'violence/graphic';
export type TextInput = {
    type: 'text';
    text: string;
};
export type ImageInput = {
    type: 'image_url';
    image_url: {
        url: string;
    };
};
export type ModerationInput = string | (TextInput | ImageInput)[];
export declare function isTextInput(input: TextInput | ImageInput): input is TextInput;
export declare function isImageInput(input: TextInput | ImageInput): input is ImageInput;
export interface OpenAIModerationConfig {
    apiKey?: string;
    headers?: Record<string, string>;
    passthrough?: Record<string, any>;
}
export declare function supportsImageInput(modelName: string): boolean;
export declare function formatModerationInput(content: string | (TextInput | ImageInput)[], supportsImages: boolean): ModerationInput;
export declare class OpenAiModerationProvider extends OpenAiGenericProvider implements ApiModerationProvider {
    static MODERATION_MODELS: {
        id: string;
        maxTokens: number;
        capabilities: string[];
    }[];
    static MODERATION_MODEL_IDS: string[];
    constructor(modelName?: OpenAIModerationModelId, options?: {
        config?: OpenAIModerationConfig;
        id?: string;
        env?: any;
    });
    callModerationApi(userPrompt: string, assistantResponse: string | (TextInput | ImageInput)[]): Promise<ProviderModerationResponse>;
}
//# sourceMappingURL=moderation.d.ts.map