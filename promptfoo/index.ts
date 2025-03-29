import {
  extractVulnerabilities,
  getPrompts,
  type PromptTested,
} from "./results/analyzeResult";

const port = 3555;

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
        return Response.json(prompts);
      },
    },
    "/analyze-result/:promptTested": {
      GET: async (req) => {
        const promptTested = req.params.promptTested;
        // osef on fait du sale
        const results = extractVulnerabilities(promptTested as PromptTested);
        return Response.json(results);
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
            body: JSON.stringify(vulnerabilities.vulnerabilities),
            headers: { "Content-Type": "application/json" },
          }
        );

        const result = await response.json();

        return Response.json(result);
      },
    },
  },

  // (optional) fallback for unmatched routes:
  // Required if Bun's version < 1.2.3
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server is running on http://localhost:${port}`);
