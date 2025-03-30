import type { ApiProvider, CallApiContextParams, ProviderOptions, ProviderResponse } from '../types';
interface WebSocketProviderConfig {
    messageTemplate: string;
    url?: string;
    timeoutMs?: number;
    transformResponse?: string | Function;
    /**
     * @deprecated
     */
    responseParser?: string | Function;
}
export declare function createTransformResponse(parser: any): (data: any) => ProviderResponse;
export declare class WebSocketProvider implements ApiProvider {
    url: string;
    config: WebSocketProviderConfig;
    transformResponse: (data: any) => ProviderResponse;
    constructor(url: string, options: ProviderOptions);
    id(): string;
    toString(): string;
    callApi(prompt: string, context?: CallApiContextParams): Promise<ProviderResponse>;
}
export {};
//# sourceMappingURL=websocket.d.ts.map