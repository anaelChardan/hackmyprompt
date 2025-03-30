import { z } from 'zod';
import { type FetchWithCacheResult } from '../cache';
import type { ApiProvider, CallApiContextParams, ProviderOptions, ProviderResponse } from '../types';
export declare function urlEncodeRawRequestPath(rawRequest: string): string;
export declare function generateSignature(privateKeyPathOrKey: string, signatureTimestamp: number, signatureDataTemplate: string, signatureAlgorithm?: string, isPath?: boolean): Promise<string>;
export declare function needsSignatureRefresh(timestamp: number, validityMs: number, bufferMs?: number): boolean;
export declare const HttpProviderConfigSchema: z.ZodObject<{
    body: z.ZodOptional<z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodString, z.ZodArray<z.ZodAny, "many">]>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    maxRetries: z.ZodOptional<z.ZodNumber>;
    method: z.ZodOptional<z.ZodString>;
    queryParams: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    request: z.ZodOptional<z.ZodString>;
    useHttps: z.ZodOptional<z.ZodBoolean>;
    sessionParser: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>]>>;
    transformRequest: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>]>>;
    transformResponse: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>]>>;
    url: z.ZodOptional<z.ZodString>;
    validateStatus: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodNumber], z.ZodUnknown>, z.ZodBoolean>]>>;
    /**
     * @deprecated use transformResponse instead
     */
    responseParser: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>]>>;
    signatureAuth: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        privateKeyPath: z.ZodOptional<z.ZodString>;
        privateKey: z.ZodOptional<z.ZodString>;
        signatureValidityMs: z.ZodDefault<z.ZodNumber>;
        signatureDataTemplate: z.ZodDefault<z.ZodString>;
        signatureAlgorithm: z.ZodDefault<z.ZodString>;
        signatureRefreshBufferMs: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        signatureValidityMs: number;
        signatureDataTemplate: string;
        signatureAlgorithm: string;
        privateKeyPath?: string | undefined;
        privateKey?: string | undefined;
        signatureRefreshBufferMs?: number | undefined;
    }, {
        privateKeyPath?: string | undefined;
        privateKey?: string | undefined;
        signatureValidityMs?: number | undefined;
        signatureDataTemplate?: string | undefined;
        signatureAlgorithm?: string | undefined;
        signatureRefreshBufferMs?: number | undefined;
    }>, {
        signatureValidityMs: number;
        signatureDataTemplate: string;
        signatureAlgorithm: string;
        privateKeyPath?: string | undefined;
        privateKey?: string | undefined;
        signatureRefreshBufferMs?: number | undefined;
    }, {
        privateKeyPath?: string | undefined;
        privateKey?: string | undefined;
        signatureValidityMs?: number | undefined;
        signatureDataTemplate?: string | undefined;
        signatureAlgorithm?: string | undefined;
        signatureRefreshBufferMs?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    headers?: Record<string, string> | undefined;
    method?: string | undefined;
    body?: string | any[] | Record<string, any> | undefined;
    queryParams?: Record<string, string> | undefined;
    maxRetries?: number | undefined;
    request?: string | undefined;
    useHttps?: boolean | undefined;
    sessionParser?: string | ((...args: unknown[]) => unknown) | undefined;
    transformRequest?: string | ((...args: unknown[]) => unknown) | undefined;
    transformResponse?: string | ((...args: unknown[]) => unknown) | undefined;
    validateStatus?: string | ((args_0: number, ...args: unknown[]) => boolean) | undefined;
    responseParser?: string | ((...args: unknown[]) => unknown) | undefined;
    signatureAuth?: {
        signatureValidityMs: number;
        signatureDataTemplate: string;
        signatureAlgorithm: string;
        privateKeyPath?: string | undefined;
        privateKey?: string | undefined;
        signatureRefreshBufferMs?: number | undefined;
    } | undefined;
}, {
    url?: string | undefined;
    headers?: Record<string, string> | undefined;
    method?: string | undefined;
    body?: string | any[] | Record<string, any> | undefined;
    queryParams?: Record<string, string> | undefined;
    maxRetries?: number | undefined;
    request?: string | undefined;
    useHttps?: boolean | undefined;
    sessionParser?: string | ((...args: unknown[]) => unknown) | undefined;
    transformRequest?: string | ((...args: unknown[]) => unknown) | undefined;
    transformResponse?: string | ((...args: unknown[]) => unknown) | undefined;
    validateStatus?: string | ((args_0: number, ...args: unknown[]) => boolean) | undefined;
    responseParser?: string | ((...args: unknown[]) => unknown) | undefined;
    signatureAuth?: {
        privateKeyPath?: string | undefined;
        privateKey?: string | undefined;
        signatureValidityMs?: number | undefined;
        signatureDataTemplate?: string | undefined;
        signatureAlgorithm?: string | undefined;
        signatureRefreshBufferMs?: number | undefined;
    } | undefined;
}>;
export type HttpProviderConfig = z.infer<typeof HttpProviderConfigSchema>;
interface SessionParserData {
    headers?: Record<string, string> | null;
    body?: Record<string, any> | string | null;
}
export declare function createSessionParser(parser: string | Function | undefined): Promise<(data: SessionParserData) => string>;
interface TransformResponseContext {
    response: FetchWithCacheResult<any>;
}
export declare function createTransformResponse(parser: string | Function | undefined): Promise<(data: any, text: string, context?: TransformResponseContext) => ProviderResponse>;
/**
 * Substitutes template variables in a JSON object or array.
 *
 * This function walks through all properties of the provided JSON structure
 * and replaces template expressions (like {{varName}}) with their actual values.
 * If a substituted string is valid JSON, it will be parsed into an object or array.
 *
 * Example:
 * Input: {"greeting": "Hello {{name}}!", "data": {"id": "{{userId}}"}}
 * Vars: {name: "World", userId: 123}
 * Output: {"greeting": "Hello World!", "data": {"id": 123}}
 *
 * @param body The JSON object or array containing template expressions
 * @param vars Dictionary of variable names and their values for substitution
 * @returns A new object or array with all template expressions replaced
 */
export declare function processJsonBody(body: Record<string, any> | any[], vars: Record<string, any>): Record<string, any> | any[];
/**
 * Substitutes template variables in a text string.
 *
 * Replaces template expressions (like {{varName}}) in the string with their
 * actual values from the provided variables dictionary.
 *
 * Example:
 * Input: "Hello {{name}}! Your user ID is {{userId}}."
 * Vars: {name: "World", userId: 123}
 * Output: "Hello World! Your user ID is 123."
 *
 * @param body The string containing template expressions to substitute
 * @param vars Dictionary of variable names and their values for substitution
 * @returns A new string with all template expressions replaced
 * @throws Error if body is an object instead of a string
 */
export declare function processTextBody(body: string, vars: Record<string, any>): string;
export declare function createTransformRequest(transform: string | Function | undefined): Promise<(prompt: string) => any>;
export declare function determineRequestBody(contentType: boolean, parsedPrompt: any, configBody: Record<string, any> | any[] | string | undefined, vars: Record<string, any>): Record<string, any> | any[] | string;
export declare function createValidateStatus(validator: string | ((status: number) => boolean) | undefined): Promise<(status: number) => boolean>;
export declare class HttpProvider implements ApiProvider {
    url: string;
    config: HttpProviderConfig;
    private transformResponse;
    private sessionParser;
    private transformRequest;
    private validateStatus;
    private lastSignatureTimestamp?;
    private lastSignature?;
    constructor(url: string, options: ProviderOptions);
    id(): string;
    toString(): string;
    private refreshSignatureIfNeeded;
    private getDefaultHeaders;
    private validateContentTypeAndBody;
    getHeaders(defaultHeaders: Record<string, string>, vars: Record<string, any>): Promise<Record<string, string>>;
    callApi(prompt: string, context?: CallApiContextParams): Promise<ProviderResponse>;
    private callApiWithRawRequest;
}
export {};
//# sourceMappingURL=http.d.ts.map