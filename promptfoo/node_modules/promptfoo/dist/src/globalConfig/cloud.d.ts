export declare const API_HOST: string;
interface CloudUser {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
interface CloudOrganization {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
interface CloudApp {
    url: string;
}
export declare class CloudConfig {
    private config;
    constructor();
    isEnabled(): boolean;
    setApiHost(apiHost: string): void;
    setApiKey(apiKey: string): void;
    getApiKey(): string | undefined;
    getApiHost(): string;
    setAppUrl(appUrl: string): void;
    getAppUrl(): string;
    delete(): void;
    private saveConfig;
    private reload;
    validateAndSetApiToken(token: string, apiHost: string): Promise<{
        user: CloudUser;
        organization: CloudOrganization;
        app: CloudApp;
    }>;
}
export declare const cloudConfig: CloudConfig;
export {};
//# sourceMappingURL=cloud.d.ts.map