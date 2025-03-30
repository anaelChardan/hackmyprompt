import type { WatsonXAI as WatsonXAIClient } from '@ibm-cloud/watsonx-ai';
import type { IamAuthenticator, BearerTokenAuthenticator } from 'ibm-cloud-sdk-core';
import { z } from 'zod';
import type { ApiProvider, ProviderResponse } from '../types';
import type { EnvOverrides } from '../types/env';
import type { ProviderOptions } from '../types/providers';
declare const ConfigSchema: z.ZodObject<{
    apiKey: z.ZodOptional<z.ZodString>;
    apiKeyEnvar: z.ZodOptional<z.ZodString>;
    apiBearerToken: z.ZodOptional<z.ZodString>;
    apiBearerTokenEnvar: z.ZodOptional<z.ZodString>;
    serviceUrl: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodString>;
    projectId: z.ZodOptional<z.ZodString>;
    modelId: z.ZodOptional<z.ZodString>;
    maxNewTokens: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    version?: string | undefined;
    apiKey?: string | undefined;
    apiKeyEnvar?: string | undefined;
    modelId?: string | undefined;
    projectId?: string | undefined;
    apiBearerToken?: string | undefined;
    apiBearerTokenEnvar?: string | undefined;
    serviceUrl?: string | undefined;
    maxNewTokens?: number | undefined;
}, {
    version?: string | undefined;
    apiKey?: string | undefined;
    apiKeyEnvar?: string | undefined;
    modelId?: string | undefined;
    projectId?: string | undefined;
    apiBearerToken?: string | undefined;
    apiBearerTokenEnvar?: string | undefined;
    serviceUrl?: string | undefined;
    maxNewTokens?: number | undefined;
}>;
export declare function generateConfigHash(config: any): string;
export declare function clearModelSpecsCache(): void;
export declare function calculateWatsonXCost(modelName: string, config: any, promptTokens?: number, completionTokens?: number): Promise<number | undefined>;
export declare class WatsonXProvider implements ApiProvider {
    modelName: string;
    options: ProviderOptions;
    env?: EnvOverrides;
    client?: WatsonXAIClient;
    config: z.infer<typeof ConfigSchema>;
    constructor(modelName: string, options: ProviderOptions);
    id(): string;
    toString(): string;
    getAuth(): Promise<IamAuthenticator | BearerTokenAuthenticator>;
    getProjectId(): string;
    getModelId(): string;
    getClient(): Promise<WatsonXAIClient>;
    callApi(prompt: string): Promise<ProviderResponse>;
}
export {};
//# sourceMappingURL=watsonx.d.ts.map