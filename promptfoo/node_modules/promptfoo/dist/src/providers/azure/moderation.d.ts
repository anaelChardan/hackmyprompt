import type { ApiModerationProvider, ProviderModerationResponse } from '../../types';
import { AzureGenericProvider } from './generic';
export declare const AZURE_MODERATION_MODELS: {
    id: string;
    maxTokens: number;
    capabilities: string[];
}[];
export type AzureModerationModelId = string;
export type AzureModerationCategory = 'Hate' | 'SelfHarm' | 'Sexual' | 'Violence';
interface AzureTextCategoriesAnalysis {
    category: AzureModerationCategory;
    severity: number;
}
interface AzureTextBlocklistMatch {
    blocklistName: string;
    blocklistItemId: string;
    blocklistItemText: string;
}
interface AzureAnalyzeTextResult {
    categoriesAnalysis?: AzureTextCategoriesAnalysis[];
    blocklistsMatch?: AzureTextBlocklistMatch[];
}
export interface AzureModerationConfig {
    apiKey?: string;
    apiKeyEnvar?: string;
    endpoint?: string;
    apiVersion?: string;
    headers?: Record<string, string>;
    blocklistNames?: string[];
    haltOnBlocklistHit?: boolean;
    passthrough?: Record<string, any>;
}
export declare function parseAzureModerationResponse(data: AzureAnalyzeTextResult): ProviderModerationResponse;
export declare function handleApiError(err: any, data?: any): ProviderModerationResponse;
export declare function getModerationCacheKey(modelName: string, config: any, content: string): string;
export declare class AzureModerationProvider extends AzureGenericProvider implements ApiModerationProvider {
    static MODERATION_MODELS: {
        id: string;
        maxTokens: number;
        capabilities: string[];
    }[];
    static MODERATION_MODEL_IDS: string[];
    apiVersion: string;
    endpoint?: string;
    modelName: string;
    configWithHeaders: AzureModerationConfig;
    constructor(modelName?: AzureModerationModelId, options?: {
        config?: AzureModerationConfig;
        id?: string;
        env?: any;
    });
    getContentSafetyApiKey(): string | undefined;
    callModerationApi(userPrompt: string, assistantResponse: string): Promise<ProviderModerationResponse>;
}
export {};
//# sourceMappingURL=moderation.d.ts.map