import type Anthropic from '@anthropic-ai/sdk';
import type { TokenUsage } from '../../types';
export declare const ANTHROPIC_MODELS: {
    id: string;
    cost: {
        input: number;
        output: number;
    };
}[];
export declare function outputFromMessage(message: Anthropic.Messages.Message, showThinking: boolean): string;
export declare function parseMessages(messages: string): {
    system?: Anthropic.TextBlockParam[];
    extractedMessages: Anthropic.MessageParam[];
    thinking?: Anthropic.ThinkingConfigParam;
};
export declare function calculateAnthropicCost(modelName: string, config: any, promptTokens?: number, completionTokens?: number): number | undefined;
export declare function getTokenUsage(data: any, cached: boolean): Partial<TokenUsage>;
//# sourceMappingURL=util.d.ts.map