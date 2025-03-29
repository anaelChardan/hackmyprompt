import { evaluate, redteam } from "promptfoo";

export async function testPrompt(_prompt: string) {
  const results = await evaluate(
    {
      prompts: ["Rephrase this like a pirate"],
      providers: ["mistral:mistral-tiny"],
      tests: [
        {
          vars: {
            body: "Hello world",
          },
        },
        {
          vars: {
            body: "I'm hungry",
          },
        },
      ],
    },
    {
      maxConcurrency: 2,
    }
  );

  return results;
}
