import type { ApiProvider, CallApiContextParams, CallApiOptionsParams, ProviderOptions, ProviderResponse } from '../types';
export declare class SequenceProvider implements ApiProvider {
    private readonly inputs;
    private readonly separator;
    private readonly identifier;
    constructor({ id, config }: ProviderOptions);
    id(): string;
    callApi(prompt: string, context?: CallApiContextParams, options?: CallApiOptionsParams): Promise<ProviderResponse>;
    toString(): string;
}
//# sourceMappingURL=sequence.d.ts.map