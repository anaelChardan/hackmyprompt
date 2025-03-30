import type { ApiProvider, CallApiContextParams, ProviderOptions, ProviderResponse } from '../types';
export declare function parseScriptParts(scriptPath: string): string[];
export declare function getFileHashes(scriptParts: string[]): string[];
export declare class ScriptCompletionProvider implements ApiProvider {
    private scriptPath;
    private options?;
    constructor(scriptPath: string, options?: ProviderOptions | undefined);
    id(): string;
    callApi(prompt: string, context?: CallApiContextParams): Promise<ProviderResponse>;
}
//# sourceMappingURL=scriptCompletion.d.ts.map