import healthBetterPrompt from "./health_open_ai_better_prompt/results.json";
import healthNaivePrompt from "./health_open_ai_naive_prompt/results.json";
import cultureNaivePrompt from "./culture_open_ai_naive_prompt/results.json";
import educationalNaivePrompt from "./educational_open_ai_naive_prompt/results.json";
import educationalBetterPrompt from "./educational_open_ai_better_prompt/results.json";

type Vulnerability = {
  vulnerability_kind: string;
  error_detected: string;
  test_prompt: string;
  input_system_prompt: string;
};

type Result = {
  vulnerabilities: Vulnerability[];
  passed_categories: string[];
};

export type PromptTested =
  | "culture_naive_prompt"
  | "health_naive_prompt"
  | "health_better_prompt"
  | "educational_naive_prompt"
  | "educational_better_prompt";

const promptTestedToResultFile: Record<PromptTested, any> = {
  culture_naive_prompt: cultureNaivePrompt,
  health_naive_prompt: healthNaivePrompt,
  health_better_prompt: healthBetterPrompt,
  educational_naive_prompt: educationalNaivePrompt,
  educational_better_prompt: educationalBetterPrompt,
};

export function getPrompts(): Record<PromptTested, string> {
  return {
    culture_naive_prompt:
      cultureNaivePrompt.config.defaultTest.metadata.purpose,
    health_naive_prompt: healthNaivePrompt.config.defaultTest.metadata.purpose,
    health_better_prompt:
      healthBetterPrompt.config.defaultTest.metadata.purpose,
    educational_naive_prompt:
      educationalNaivePrompt.config.defaultTest.metadata.purpose,
    educational_better_prompt:
      educationalBetterPrompt.config.defaultTest.metadata.purpose,
  };
}

export function extractVulnerabilities(test: PromptTested): Result {
  const resultFile = promptTestedToResultFile[test];

  const givenSystemPrompt = resultFile.config.defaultTest.metadata.purpose;

  const results = resultFile.results.results;

  // Check if results has the expected structure
  if (!results || !Array.isArray(results)) {
    console.error("Invalid results structure: results.results is not an array");
    return {
      vulnerabilities: [],
      passed_categories: [],
    };
  }

  const vulnerabilityGroupedByKind = new Map<string, Vulnerability>();
  const passedCategories = new Set<string>();

  // Iterate through all results
  for (const result of results) {
    // Check if this result represents a failure (failureReason === 1)
    const kind = (result.testCase?.metadata?.pluginId || "unknown").split(
      ":"
    )[0]!;
    if (result.failureReason === 1) {
      // Extract the vulnerability kind from metadata if available

      // Extract the error message
      const error = result.error || "No error message provided";

      // Extract the prompt that caused the vulnerability
      const testPrompt = result.vars?.prompt || "No prompt available";

      vulnerabilityGroupedByKind.set(kind, {
        vulnerability_kind: kind,
        error_detected: error,
        test_prompt: testPrompt,
        input_system_prompt: givenSystemPrompt,
      });
    } else {
      passedCategories.add(kind);
    }
  }

  const vulnerabilities = Array.from(vulnerabilityGroupedByKind.values());

  return {
    vulnerabilities,
    passed_categories: Array.from(passedCategories),
  };
}

export function getAllResults(): Record<PromptTested, Result> {
  return Object.fromEntries(
    Object.entries(promptTestedToResultFile).map(([key, value]) => [
      key,
      extractVulnerabilities(key as PromptTested),
    ])
  );
}
