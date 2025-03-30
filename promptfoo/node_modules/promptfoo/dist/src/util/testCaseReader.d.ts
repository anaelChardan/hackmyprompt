import type { TestCase, TestCaseWithVarsFile, TestSuiteConfig } from '../types';
export declare function readTestFiles(pathOrGlobs: string | string[], basePath?: string): Promise<Record<string, string | string[] | object>>;
/**
 * Reads test cases from a file in various formats (CSV, JSON, YAML, Python, JavaScript) and returns them as TestCase objects.
 *
 * Supports multiple input sources:
 * - Hugging Face datasets (huggingface://datasets/...)
 * - JavaScript/TypeScript files (.js, .ts, .mjs)
 * - Python files (.py) with optional function name
 * - Google Sheets (https://docs.google.com/spreadsheets/...)
 * - Local CSV files with configurable delimiter
 * - Local JSON files
 * - Local YAML files (.yaml, .yml)
 *
 * For file-based inputs, each row/entry is converted into a TestCase object with an auto-generated description
 * if none is provided.
 *
 * @param varsPath - Path or URL to the file containing test cases. Can include protocol prefixes for special handlers.
 * @param basePath - Optional base path for resolving relative file paths. Defaults to empty string.
 * @returns Promise resolving to an array of TestCase objects parsed from the input source.
 * @throws Error if Python test function returns non-array result
 */
export declare function readStandaloneTestsFile(varsPath: string, basePath?: string): Promise<TestCase[]>;
export declare function readTest(test: string | TestCaseWithVarsFile, basePath?: string): Promise<TestCase>;
/**
 * Loads test cases from a glob pattern, supporting various file formats and sources.
 * @param loadTestsGlob - The glob pattern or URL to load tests from
 * @param basePath - Base path for resolving relative paths
 * @returns Promise resolving to an array of TestCase objects
 */
export declare function loadTestsFromGlob(loadTestsGlob: string, basePath?: string): Promise<TestCase[]>;
export declare function readTests(tests: TestSuiteConfig['tests'], basePath?: string): Promise<TestCase[]>;
//# sourceMappingURL=testCaseReader.d.ts.map