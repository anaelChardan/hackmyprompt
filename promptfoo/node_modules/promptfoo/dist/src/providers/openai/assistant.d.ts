import OpenAI from 'openai';
import type { Metadata } from 'openai/resources/shared';
import { OpenAiGenericProvider } from '.';
import type { CallApiContextParams, CallApiOptionsParams, ProviderResponse } from '../../types';
import type { EnvOverrides } from '../../types/env';
import type { OpenAiSharedOptions } from './types';
export type OpenAiAssistantOptions = OpenAiSharedOptions & {
    modelName?: string;
    instructions?: string;
    tools?: OpenAI.Beta.Threads.ThreadCreateAndRunParams['tools'];
    /**
     * If set, automatically call these functions when the assistant activates
     * these function tools.
     */
    functionToolCallbacks?: Record<OpenAI.FunctionDefinition['name'], (arg: string) => Promise<string>>;
    metadata?: Metadata;
    temperature?: number;
    toolChoice?: 'none' | 'auto' | 'required' | {
        type: 'function';
        function?: {
            name: string;
        };
    } | {
        type: 'file_search';
    };
    attachments?: OpenAI.Beta.Threads.Message.Attachment[];
    tool_resources?: OpenAI.Beta.Threads.ThreadCreateAndRunParams['tool_resources'];
};
export declare class OpenAiAssistantProvider extends OpenAiGenericProvider {
    assistantId: string;
    assistantConfig: OpenAiAssistantOptions;
    constructor(assistantId: string, options?: {
        config?: OpenAiAssistantOptions;
        id?: string;
        env?: EnvOverrides;
    });
    callApi(prompt: string, context?: CallApiContextParams, callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
}
//# sourceMappingURL=assistant.d.ts.map