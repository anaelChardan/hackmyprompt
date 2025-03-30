import type { ApiProvider, CallApiContextParams, CallApiOptionsParams, ProviderOptions, ProviderResponse } from '../types';
export type AgentSubproviderConfig = {
    id: string;
};
export type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};
export type AgentProviderOptions = ProviderOptions & {
    config?: {
        userProvider?: ProviderOptions;
        instructions?: string;
        maxTurns?: number;
    };
};
export declare class SimulatedUser implements ApiProvider {
    private readonly identifier;
    private readonly maxTurns;
    private readonly rawInstructions;
    constructor({ id, label, config }: AgentProviderOptions);
    id(): string;
    private sendMessageToUser;
    private sendMessageToAgent;
    callApi(prompt: string, context?: CallApiContextParams, _callApiOptions?: CallApiOptionsParams): Promise<ProviderResponse>;
    toString(): string;
}
//# sourceMappingURL=simulatedUser.d.ts.map