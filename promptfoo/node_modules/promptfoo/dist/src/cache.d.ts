import cacheManager from 'cache-manager';
export declare function getCache(): cacheManager.Cache;
export type FetchWithCacheResult<T> = {
    data: T;
    cached: boolean;
    status: number;
    statusText: string;
    headers?: Record<string, string>;
    deleteFromCache?: () => Promise<void>;
};
export declare function fetchWithCache<T = any>(url: RequestInfo, options?: RequestInit, timeout?: number, format?: 'json' | 'text', bust?: boolean, maxRetries?: number): Promise<FetchWithCacheResult<T>>;
export declare function enableCache(): void;
export declare function disableCache(): void;
export declare function clearCache(): Promise<void>;
export declare function isCacheEnabled(): boolean;
//# sourceMappingURL=cache.d.ts.map