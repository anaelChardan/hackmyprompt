import { z } from 'zod';
import type { ApiProvider } from '../types/providers';
export declare const PromptConfigSchema: z.ZodObject<{
    prefix: z.ZodOptional<z.ZodString>;
    suffix: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    prefix?: string | undefined;
    suffix?: string | undefined;
}, {
    prefix?: string | undefined;
    suffix?: string | undefined;
}>;
export declare const PromptFunctionSchema: z.ZodFunction<z.ZodTuple<[z.ZodObject<{
    vars: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodAny]>>;
    provider: z.ZodOptional<z.ZodType<ApiProvider, z.ZodTypeDef, ApiProvider>>;
}, "strip", z.ZodTypeAny, {
    vars: Record<string, any>;
    provider?: ApiProvider | undefined;
}, {
    vars: Record<string, any>;
    provider?: ApiProvider | undefined;
}>], z.ZodUnknown>, z.ZodPromise<z.ZodUnion<[z.ZodString, z.ZodAny]>>>;
export declare const PromptSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    raw: z.ZodString;
    /**
     * @deprecated in > 0.59.0. Use `label` instead.
     */
    display: z.ZodOptional<z.ZodString>;
    label: z.ZodString;
    function: z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodObject<{
        vars: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodAny]>>;
        provider: z.ZodOptional<z.ZodType<ApiProvider, z.ZodTypeDef, ApiProvider>>;
    }, "strip", z.ZodTypeAny, {
        vars: Record<string, any>;
        provider?: ApiProvider | undefined;
    }, {
        vars: Record<string, any>;
        provider?: ApiProvider | undefined;
    }>], z.ZodUnknown>, z.ZodPromise<z.ZodUnion<[z.ZodString, z.ZodAny]>>>>;
    config: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    raw: string;
    label: string;
    function?: ((args_0: {
        vars: Record<string, any>;
        provider?: ApiProvider | undefined;
    }, ...args: unknown[]) => Promise<any>) | undefined;
    id?: string | undefined;
    config?: any;
    display?: string | undefined;
}, {
    raw: string;
    label: string;
    function?: ((args_0: {
        vars: Record<string, any>;
        provider?: ApiProvider | undefined;
    }, ...args: unknown[]) => Promise<any>) | undefined;
    id?: string | undefined;
    config?: any;
    display?: string | undefined;
}>;
//# sourceMappingURL=prompts.d.ts.map