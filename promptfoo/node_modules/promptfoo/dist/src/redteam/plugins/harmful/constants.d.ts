import type { REDTEAM_PROVIDER_HARM_PLUGINS } from '../../constants';
export interface HarmfulCategory {
    key: keyof typeof REDTEAM_PROVIDER_HARM_PLUGINS;
    label: (typeof REDTEAM_PROVIDER_HARM_PLUGINS)[keyof typeof REDTEAM_PROVIDER_HARM_PLUGINS];
    description: string;
    prompt: string;
    examples: string;
}
export declare const REDTEAM_MODEL_CATEGORIES: HarmfulCategory[];
//# sourceMappingURL=constants.d.ts.map