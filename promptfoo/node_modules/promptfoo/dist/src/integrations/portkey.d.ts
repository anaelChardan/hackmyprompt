interface PortkeyResponse {
    success: boolean;
    data: {
        model: string;
        n: number;
        top_p: number;
        max_tokens: number;
        temperature: number;
        presence_penalty: number;
        frequency_penalty: number;
        messages: Array<{
            role: string;
            content: string;
        }>;
    };
}
export declare function getPrompt(id: string, variables: Record<string, any>): Promise<PortkeyResponse['data']>;
export {};
//# sourceMappingURL=portkey.d.ts.map