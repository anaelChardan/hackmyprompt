import type { ApiProvider, CallApiContextParams, CallApiOptionsParams, ProviderOptions, ProviderResponse } from '../../types/providers';
export default class BestOfNProvider implements ApiProvider {
    private readonly injectVar;
    private readonly maxConcurrency;
    private readonly nSteps?;
    private readonly maxCandidatesPerStep?;
    id(): string;
    constructor(options?: ProviderOptions & {
        injectVar?: string;
        maxConcurrency?: number;
        nSteps?: number;
        maxCandidatesPerStep?: number;
    });
    callApi(prompt: string, context?: CallApiContextParams, options?: CallApiOptionsParams): Promise<ProviderResponse>;
}
//# sourceMappingURL=bestOfN.d.ts.map