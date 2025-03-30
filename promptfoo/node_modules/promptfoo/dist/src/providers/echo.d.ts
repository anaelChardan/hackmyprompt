import type { ApiProvider, ProviderOptions, ProviderResponse } from '../types/providers';
export declare class EchoProvider implements ApiProvider {
    private options;
    label?: string;
    config?: any;
    delay?: number;
    constructor(options?: ProviderOptions);
    id(): string;
    toString(): string;
    callApi(input: string, options?: Record<string, any>, context?: any): Promise<ProviderResponse>;
}
//# sourceMappingURL=echo.d.ts.map