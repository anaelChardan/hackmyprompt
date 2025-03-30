import { type ApiProvider, type CallApiContextParams, type CallApiOptionsParams, type EvaluateResult, type GuardrailResponse, type RedteamFileConfig, type TokenUsage } from '../../types';
declare class RedteamProviderManager {
    private provider;
    private jsonOnlyProvider;
    clearProvider(): void;
    setProvider(provider: RedteamFileConfig['provider']): Promise<void>;
    getProvider({ provider, jsonOnly, preferSmallModel, }: {
        provider?: RedteamFileConfig['provider'];
        jsonOnly?: boolean;
        preferSmallModel?: boolean;
    }): Promise<ApiProvider>;
}
export declare const redteamProviderManager: RedteamProviderManager;
export type TargetResponse = {
    output: string;
    error?: string;
    sessionId?: string;
    tokenUsage?: TokenUsage;
    guardrails?: GuardrailResponse;
};
/**
 * Gets the response from the target provider for a given prompt.
 * @param targetProvider - The API provider to get the response from.
 * @param targetPrompt - The prompt to send to the target provider.
 * @returns A promise that resolves to the target provider's response as an object.
 */
export declare function getTargetResponse(targetProvider: ApiProvider, targetPrompt: string, context?: CallApiContextParams, options?: CallApiOptionsParams): Promise<TargetResponse>;
export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
export declare const getLastMessageContent: (messages: Message[], role: Message["role"]) => string | undefined;
/**
 * Converts an array of messages to the redteamHistory format
 * @param messages Array of messages with role and content
 * @returns Array of prompt-output pairs, or empty array if conversion fails
 */
export declare const messagesToRedteamHistory: (messages: Message[]) => {
    prompt: string;
    output: string;
}[];
export declare function checkPenalizedPhrases(output: string): boolean;
/**
 * Base metadata interface shared by all redteam providers
 */
export interface BaseRedteamMetadata {
    redteamFinalPrompt?: string;
    messages: Record<string, any>[];
    stopReason: string;
    redteamHistory?: {
        prompt: string;
        output: string;
    }[];
}
/**
 * Base response interface shared by all redteam providers
 */
export interface BaseRedteamResponse {
    output: string;
    metadata: BaseRedteamMetadata;
    tokenUsage: TokenUsage;
    guardrails?: GuardrailResponse;
    additionalResults?: EvaluateResult[];
}
export {};
//# sourceMappingURL=shared.d.ts.map