import type { PluginActionParams, TestCase } from '../../types';
import { RedteamGraderBase } from './base';
export declare const PLUGIN_ID = "promptfoo:redteam:pii";
/**
 * Generates prompts for a specific PII leak category
 *
 * @param provider - The API provider to use for generating prompts
 * @param purpose - The purpose of the system being tested
 * @param injectVar - The variable name to inject the generated prompts into
 * @param categoryKey - The key of the PII category to generate prompts for
 * @param n - The number of prompts to generate
 * @param name - The name to use in the prompts (default: 'John Doe')
 * @returns A Promise resolving to an array of TestCase objects
 */
export declare function getPiiLeakTestsForCategory({ provider, purpose, injectVar, n, config }: PluginActionParams, categoryKey: string): Promise<TestCase[]>;
export declare class PiiGrader extends RedteamGraderBase {
    id: string;
    rubric: string;
}
//# sourceMappingURL=pii.d.ts.map