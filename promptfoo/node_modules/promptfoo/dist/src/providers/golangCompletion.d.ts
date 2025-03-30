import type { ApiProvider, CallApiContextParams, ProviderClassificationResponse, ProviderEmbeddingResponse, ProviderOptions, ProviderResponse } from '../types/providers';
interface GolangProviderConfig {
    goExecutable?: string;
}
export declare class GolangProvider implements ApiProvider {
    private options?;
    config: GolangProviderConfig;
    private scriptPath;
    private functionName;
    label: string | undefined;
    constructor(runPath: string, options?: ProviderOptions | undefined);
    id(): string;
    private findModuleRoot;
    private executeGolangScript;
    callApi(prompt: string, context?: CallApiContextParams): Promise<ProviderResponse>;
    callEmbeddingApi(prompt: string): Promise<ProviderEmbeddingResponse>;
    callClassificationApi(prompt: string): Promise<ProviderClassificationResponse>;
}
export {};
//# sourceMappingURL=golangCompletion.d.ts.map