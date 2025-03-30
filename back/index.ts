import {
  extractVulnerabilities,
  getAllResults,
  getPrompts,
  type PromptTested,
} from "./results/analyze-result";

const port = 3555;

export function toResponse(body: any) {
  const res = Response.json(body);

  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set("Access-Control-Allow-Headers", "*");

  return res;
}

Bun.serve({
  port,
  routes: {
    // DEPRECATED : ONLY PAID VERSION
    // "/test-prompt": {
    //   POST: async (req) => {
    //     const body = await req.json();
    //     // @ts-ignore
    //     const results = await testPrompt(body.prompt);
    //     return Response.json(results);
    //   },
    // },
    "/prompts": {
      GET: async (req) => {
        const prompts = getPrompts();

        return toResponse(prompts);
      },
    },
    "/all-results": {
      GET: async (req) => {
        const results = getAllResults();
        return toResponse(results);
      },
    },
    "/analyze-result/:promptTested": {
      GET: async (req) => {
        const promptTested = req.params.promptTested;
        // osef on fait du sale
        const results = extractVulnerabilities(promptTested as PromptTested);
        return toResponse(results);
      },
    },
    "/agents/:promptTested": {
      GET: async (req) => {
        const promptTested = req.params.promptTested;

        const vulnerabilities = extractVulnerabilities(
          promptTested as PromptTested
        );

        const response = await fetch(
          "https://marcassin.app.n8n.cloud/webhook/c4835705-d0cf-4b84-8953-344c4244ac13",
          {
            method: "POST",
            body: JSON.stringify(
              vulnerabilities.vulnerabilities.map((e) => ({
                vulnerability_kind: e.vulnerability_kind,
                error_detected: e.error_detected,
                test_prompt: e.test_prompt,
                input_system_prompt: e.input_system_prompt,
              }))
            ),
            headers: { "Content-Type": "application/json" },
          }
        );

        const result = await response.json();

        return toResponse(result);
      },
    },
  },

  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server is running on http://localhost:${port}`);
