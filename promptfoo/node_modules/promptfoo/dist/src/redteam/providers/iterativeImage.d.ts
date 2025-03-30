import type { ApiProvider, CallApiContextParams, CallApiOptionsParams } from '../../types';
declare class RedteamIterativeProvider implements ApiProvider {
    readonly config: Record<string, string | object>;
    private readonly redteamProvider;
    constructor(config: Record<string, string | object>);
    id(): string;
    callApi(prompt: string, context?: CallApiContextParams & {
        injectVar?: string;
    }, options?: CallApiOptionsParams): Promise<{
        output: string | undefined;
        metadata: {
            finalIteration: number;
            highestScore: number;
            redteamHistory: {
                role: "user" | "assistant" | "system";
                content: string;
            }[];
            redteamFinalPrompt: string | undefined;
            bestImageUrl: string | undefined;
            bestImageDescription: string | undefined;
        };
        tokenUsage: {
            total: number;
            prompt: number;
            completion: number;
            numRequests: number;
            cached: number;
        };
    }>;
}
export default RedteamIterativeProvider;
//# sourceMappingURL=iterativeImage.d.ts.map