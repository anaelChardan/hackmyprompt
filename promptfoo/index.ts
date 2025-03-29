const port = 3555;

Bun.serve({
  port,
  // `routes` requires Bun v1.2.3+
  routes: {
    // Per-HTTP method handlers
    "/test-prompt": {
      POST: async (req) => {
        const body = await req.json();
        console.log(body);
        return new Response(JSON.stringify(body));
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