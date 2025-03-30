import type { Assertion, AssertionValue, ResultSuggestion } from '../../types';
import { RedteamPluginBase, RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:contracts";
export declare class ContractPlugin extends RedteamPluginBase {
    readonly id = "promptfoo:redteam:contracts";
    protected getTemplate(): Promise<string>;
    protected getAssertions(prompt: string): Assertion[];
}
export declare class ContractsGrader extends RedteamGraderBase {
    readonly id = "promptfoo:redteam:contracts";
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
    }): ResultSuggestion[];
}
//# sourceMappingURL=contracts.d.ts.map