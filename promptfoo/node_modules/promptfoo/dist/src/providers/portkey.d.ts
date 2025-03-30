import type { ProviderOptions } from '../types';
import { OpenAiChatCompletionProvider } from './openai/chat';
import type { OpenAiCompletionOptions } from './openai/types';
interface PortkeyProviderOptions extends ProviderOptions {
    config?: OpenAiCompletionOptions & {
        portkeyApiKey?: string;
        portkeyVirtualKey?: string;
        portkeyMetadata?: Record<string, any>;
        portkeyConfig?: string;
        portkeyProvider?: string;
        portkeyCustomHost?: string;
        portkeyTraceId?: string;
        portkeyCacheForceRefresh?: boolean;
        portkeyCacheNamespace?: string;
        portkeyForwardHeaders?: string[];
        portkeyApiBaseUrl?: string;
        portkeyAzureResourceName?: string;
        portkeyAzureDeploymentId?: string;
        portkeyAzureApiVersion?: string;
        portkeyVertexProjectId?: string;
        portkeyVertexRegion?: string;
        portkeyAwsSecretAccessKey?: string;
        portkeyAwsRegion?: string;
        portkeyAwsSessionToken?: string;
        portkeyAwsAccessKeyId?: string;
        [key: string]: any;
    };
}
export declare function toKebabCase(str: string): string;
export declare function getPortkeyHeaders(config?: Record<string, any>): Record<string, string>;
export declare class PortkeyChatCompletionProvider extends OpenAiChatCompletionProvider {
    constructor(modelName: string, providerOptions: PortkeyProviderOptions);
}
export {};
//# sourceMappingURL=portkey.d.ts.map