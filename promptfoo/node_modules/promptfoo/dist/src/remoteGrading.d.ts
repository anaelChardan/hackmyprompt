import type { GradingResult } from './types';
type RemoteGradingPayload = {
    task: string;
    [key: string]: unknown;
};
export declare function doRemoteGrading(payload: RemoteGradingPayload): Promise<Omit<GradingResult, 'assertion'>>;
export {};
//# sourceMappingURL=remoteGrading.d.ts.map