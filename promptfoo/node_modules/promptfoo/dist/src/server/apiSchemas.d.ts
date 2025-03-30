import { z } from 'zod';
export declare const ApiSchemas: {
    User: {
        Get: {
            Response: z.ZodObject<{
                email: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                email: string | null;
            }, {
                email: string | null;
            }>;
        };
        Update: {
            Request: z.ZodObject<{
                email: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
            }, {
                email: string;
            }>;
            Response: z.ZodObject<{
                success: z.ZodBoolean;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                success: boolean;
            }, {
                message: string;
                success: boolean;
            }>;
        };
    };
    Eval: {
        UpdateAuthor: {
            Params: z.ZodObject<{
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
            }, {
                id: string;
            }>;
            Request: z.ZodObject<{
                author: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                author: string;
            }, {
                author: string;
            }>;
            Response: z.ZodObject<{
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
            }, {
                message: string;
            }>;
        };
    };
};
//# sourceMappingURL=apiSchemas.d.ts.map