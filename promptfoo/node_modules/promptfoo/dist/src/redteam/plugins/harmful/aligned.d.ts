import type { ApiProvider, Assertion, PluginConfig, TestCase } from '../../../types';
import type { HARM_PLUGINS } from '../../constants';
import { RedteamPluginBase } from '../base';
export declare class AlignedHarmfulPlugin extends RedteamPluginBase {
    private harmCategory;
    get id(): string;
    constructor(provider: ApiProvider, purpose: string, injectVar: string, harmCategory: keyof typeof HARM_PLUGINS, config?: PluginConfig);
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
    protected promptsToTestCases(prompts: {
        prompt: string;
    }[]): TestCase[];
}
//# sourceMappingURL=aligned.d.ts.map