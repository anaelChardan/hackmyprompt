import type { AssertionValue, ResultSuggestion } from '../../types';
import { RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:bfla";
export declare class BflaGrader extends RedteamGraderBase {
    id: string;
    rubric: string;
    getSuggestions({ rawPrompt, renderedValue, }: {
        rawPrompt: string;
        renderedValue?: AssertionValue;
    }): ResultSuggestion[];
}
//# sourceMappingURL=bfla.d.ts.map