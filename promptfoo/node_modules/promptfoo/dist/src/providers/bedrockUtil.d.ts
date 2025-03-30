interface AmazonResponse {
    output?: {
        message?: {
            role: string;
            content: {
                text?: string;
                toolUse?: {
                    name: string;
                    toolUseId: string;
                    input: any;
                };
            }[];
        };
    };
    stopReason?: string;
    usage?: {
        cacheReadInputTokenCount?: number;
        cacheWriteInputTokenCount?: number;
        inputTokens?: number;
        outputTokens?: number;
        totalTokens?: number;
    };
}
export declare function novaOutputFromMessage(response: AmazonResponse): string | undefined;
export interface TextBlockParam {
    text: string;
}
export interface ImageBlockParam {
    image: {
        format: 'jpeg' | 'png' | 'gif' | 'webp';
        source: {
            bytes: Uint8Array | string;
        };
    };
}
export interface VideoBlockParam {
    video: {
        format: 'mkv' | 'mov' | 'mp4' | 'webm' | 'three_gp' | 'flv' | 'mpeg' | 'mpg' | 'wmv';
        source: {
            s3Location?: {
                uri: string;
                bucketOwner?: string;
            };
            bytes?: Uint8Array | string;
        };
    };
}
export interface ToolUseBlockParam {
    id: string;
    input: unknown;
    name: string;
}
export interface ToolResultBlockParam {
    toolUseId: string;
    content?: string | Array<TextBlockParam | ImageBlockParam>;
    status?: string;
}
export interface MessageParam {
    content: string | Array<TextBlockParam | ImageBlockParam | ToolUseBlockParam | ToolResultBlockParam>;
    role: 'user' | 'assistant';
}
export declare function novaParseMessages(messages: string): {
    system?: TextBlockParam[];
    extractedMessages: MessageParam[];
};
export {};
//# sourceMappingURL=bedrockUtil.d.ts.map