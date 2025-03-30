import type { RedteamGraderBase } from './plugins/base';
import type { RedteamAssertionTypes } from './types';
export declare const GRADERS: Record<RedteamAssertionTypes, RedteamGraderBase>;
export declare function getGraderById(id: string): RedteamGraderBase | undefined;
//# sourceMappingURL=graders.d.ts.map