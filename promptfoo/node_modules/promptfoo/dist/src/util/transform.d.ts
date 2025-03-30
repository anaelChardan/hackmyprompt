import type { Prompt, Vars } from '../types';
export type TransformContext = {
    vars?: Vars;
    prompt: Partial<Prompt>;
    uuid?: string;
};
export declare enum TransformInputType {
    OUTPUT = "output",
    VARS = "vars"
}
/**
 * Transforms the output using a specified function or file.
 *
 * @param codeOrFilepath - The transformation function code or file path.
 * If it starts with 'file://', it's treated as a file path. The file path can
 * optionally include a function name (e.g., 'file://transform.js:myFunction').
 * If no function name is provided for Python files, it defaults to 'get_transform'.
 * For inline code, it's treated as JavaScript.
 * @param transformInput - The output to be transformed. Can be a string or an object.
 * @param context - The context object containing variables and prompt information.
 * @param validateReturn - Optional. If true, throws an error if the transform function doesn't return a value.
 * @returns A promise that resolves to the transformed output.
 * @throws Error if the file format is unsupported or if the transform function
 * doesn't return a value (unless validateReturn is false).
 */
export declare function transform(codeOrFilepath: string, transformInput: string | object | undefined, context: TransformContext, validateReturn?: boolean, inputType?: TransformInputType): Promise<Vars>;
//# sourceMappingURL=transform.d.ts.map