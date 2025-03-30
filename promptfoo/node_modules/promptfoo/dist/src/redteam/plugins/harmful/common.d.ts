import type { Assertion, TestCase } from '../../../types';
import { HARM_PLUGINS } from '../../constants';
export declare function getHarmfulAssertions(harmCategory: keyof typeof HARM_PLUGINS): Assertion[];
export declare function createTestCase(injectVar: string, output: string, harmCategory: keyof typeof HARM_PLUGINS): TestCase;
//# sourceMappingURL=common.d.ts.map