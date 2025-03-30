export interface ResultError<K> {
    data: null;
    error: K;
}
export interface ResultSuccess<T> {
    data: T;
    error: null;
}
export type Result<T, K> = ResultSuccess<T> | ResultError<K>;
export declare function getPrompt(id: string, variables: Record<string, any>, majorVersion?: number, minorVersion?: number): Promise<string>;
//# sourceMappingURL=helicone.d.ts.map