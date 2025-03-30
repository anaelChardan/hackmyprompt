/**
 * BLEU (Bilingual Evaluation Understudy) Score Implementation
 *
 * Implementation based on:
 * Papineni, K., Roukos, S., Ward, T., & Zhu, W. J. (2002).
 * "BLEU: a method for automatic evaluation of machine translation."
 * In Proceedings of the 40th Annual Meeting of the ACL, pp. 311-318.
 *
 * {@link https://doi.org/10.3115/1073083.1073135}
 */
import type { AssertionParams, GradingResult } from '../types';
/**
 * Calculates BLEU score for a candidate string against reference strings.
 *
 * @param candidate - The string to evaluate
 * @param references - Array of reference strings to compare against
 * @param weights - Weights for each n-gram precision (1-gram to 4-gram)
 * @returns BLEU score between 0 and 1
 * @throws When inputs are invalid or weights don't sum to 1
 */
export declare function calculateBleuScore(candidate: string, references: string[], weights?: number[]): number;
/**
 * Handles BLEU score assertion for promptfoo.
 * Compares output against reference(s) using BLEU metric.
 *
 * @param assertion - The assertion configuration
 * @param inverse - Whether to invert the comparison
 * @param outputString - Actual output to evaluate
 * @param renderedValue - Expected output(s)
 * @returns Result of the BLEU score comparison
 */
export declare function handleBleuScore({ assertion, inverse, outputString, renderedValue, }: Pick<AssertionParams, 'assertion' | 'renderedValue' | 'outputString' | 'inverse'>): GradingResult;
//# sourceMappingURL=bleu.d.ts.map