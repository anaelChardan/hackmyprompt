import healthBetterPrompt from "./health_open_ai_better_prompt/results.json";
import healthNaivePrompt from "./health_open_ai_naive_prompt/results.json";
import cultureNaivePrompt from "./culture_open_ai_naive_prompt/results.json";
import educationalNaivePrompt from "./educational_open_ai_naive_prompt/results.json";
import educationalBetterPrompt from "./educational_open_ai_better_prompt/results.json";
import vulnerabilitiesFormatCategories from "./vulnerabilities_format_categories.json";
import cultureBetterPrompt from "./culture_open_ai_better_prompt/results.json";

type Vulnerability = {
  vulnerability_kind: string;
  error_detected: string;
  test_prompt: string;
  input_system_prompt: string;
  name: string;
  description: string;
  test_result: string;
};

type Result = {
  score: string;
  vulnerabilities: Vulnerability[];
  passed_categories: {
    name: string;
    description: string;
  }[];
};

export type PromptTested =
  | "culture_naive_prompt"
  | "culture_better_prompt"
  | "health_naive_prompt"
  | "health_better_prompt"
  | "educational_naive_prompt"
  | "educational_better_prompt";

const promptTestedToResultFile: Record<PromptTested, any> = {
  culture_naive_prompt: cultureNaivePrompt,
  culture_better_prompt: cultureBetterPrompt,
  health_naive_prompt: healthNaivePrompt,
  health_better_prompt: healthBetterPrompt,
  educational_naive_prompt: educationalNaivePrompt,
  educational_better_prompt: educationalBetterPrompt,
};

export function getPrompts(): Record<
  PromptTested,
  {
    category: string;
    kind: string;
    prompt: string;
    id: string;
  }
> {
  return {
    culture_naive_prompt: {
      category: "Culture",
      kind: "naive",
      prompt: cultureNaivePrompt.config.defaultTest.metadata.purpose,
      id: "culture_naive_prompt",
    },
    health_naive_prompt: {
      category: "Health",
      kind: "naive",
      prompt: healthNaivePrompt.config.defaultTest.metadata.purpose,
      id: "health_naive_prompt",
    },
    health_better_prompt: {
      category: "Health",
      kind: "better",
      prompt: healthBetterPrompt.config.defaultTest.metadata.purpose,
      id: "health_better_prompt",
    },
    educational_naive_prompt: {
      category: "Educational",
      kind: "naive",
      prompt: educationalNaivePrompt.config.defaultTest.metadata.purpose,
      id: "educational_naive_prompt",
    },
    educational_better_prompt: {
      category: "Educational",
      kind: "better",
      prompt: educationalBetterPrompt.config.defaultTest.metadata.purpose,
      id: "educational_better_prompt",
    },
    culture_better_prompt: {
      category: "Culture",
      kind: "better",
      prompt: cultureBetterPrompt.config.defaultTest.metadata.purpose,
      id: "culture_better_prompt",
    },
  };
}

function extractDetailsFromVulnerability(vulnerabilityId: string): {
  name: string;
  description: string;
} {
  const vulnerability = vulnerabilitiesFormatCategories.find(
    (v) => v.id === vulnerabilityId
  );

  if (!vulnerability) {
    return {
      name: "unknown",
      description: "unknown",
    };
  }

  return {
    name: vulnerability.name,
    description: vulnerability.description,
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
      score: "0",
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
        test_result: result.response.output,
        input_system_prompt: givenSystemPrompt,
        ...extractDetailsFromVulnerability(kind),
      });
    } else {
      passedCategories.add(kind);
    }
  }

  const vulnerabilities = Array.from(vulnerabilityGroupedByKind.values());
  const realPassedCategories = Array.from(passedCategories).filter(
    (c) => !vulnerabilityGroupedByKind.has(c)
  );

  return {
    score: realPassedCategories.length.toString(),
    vulnerabilities,
    passed_categories: realPassedCategories.map((e) => ({
      ...extractDetailsFromVulnerability(e),
    })),
  };
}

export function getAllResults(): Record<PromptTested, Result> {
  // @ts-ignore
  return Object.fromEntries(
    Object.entries(promptTestedToResultFile).map(([key, value]) => [
      key,
      extractVulnerabilities(key as PromptTested),
    ])
  );
}
