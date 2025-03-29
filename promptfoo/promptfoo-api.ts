import { evaluate, redteam } from "promptfoo";

Bun.env.MISTRAL_API_KEY = "mgqjZD8pIEIJiC3wVmjj9E3CrcDPDcf7";

export async function testPrompt(_prompt: string) {
  console.log(Bun.env.MISTRAL_API_KEY);
  await redteam()
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
