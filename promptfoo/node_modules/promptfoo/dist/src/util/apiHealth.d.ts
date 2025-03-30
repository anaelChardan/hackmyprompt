export interface HealthResponse {
    status: string;
    message: string;
}
/**
 * Checks the health of the remote API.
 * @param url - The URL to check.
 * @returns A promise that resolves to the health check response.
 */
export declare function checkRemoteHealth(url: string): Promise<HealthResponse>;
//# sourceMappingURL=apiHealth.d.ts.map