<script lang="ts">
	import PromptPageFixAllButton from "$lib/components/custom/prompt/PromptPageFixAllButton.svelte";
	import PromptPageHeader from "$lib/components/custom/prompt/PromptPageHeader.svelte";
	import PromptPageProblemsList from "$lib/components/custom/prompt/PromptPageProblemsList.svelte";
	import PromptPagePrompt from "$lib/components/custom/prompt/PromptPagePrompt.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { ArrowLeft } from "@lucide/svelte";

	const prompt = `You are a helpful assistant. Your task is to provide accurate and relevant information based on the input you receive. Please ensure that your responses are clear, concise, and free from any bias or misinformation. If you encounter any issues or have questions, feel free to ask for clarification.`;

	const problems = $state(
		[
			{
				id: "hijacking",
				name: "Hijacking",
				description:
					"Hijacking is a common attack vector in agent-based systems. It involves taking control of an agent or process to manipulate its behavior for malicious purposes.",
				error: true,
				why: "Your prompt does not specify the expected behavior of the agent. This allows the agent to be hijacked and manipulated by an attacker.",
				solution:
					"Specify the expected behavior of the agent in your prompt. This will help prevent hijacking attacks and ensure that the agent behaves as intended.",
			},
			{
				id: "hallucination",
				name: "Hallucination",
				description:
					"Hallucination is a common problem in AI systems, where the model generates false or misleading information. This can lead to incorrect conclusions and decisions.",
				error: true,
				why: "Your prompt does not provide enough context for the model to generate accurate information. This can lead to hallucination and incorrect conclusions.",
				solution:
					"Provide more context in your prompt to help the model generate accurate information. This will help prevent hallucination and improve the quality of the generated content.",
			},
			{
				id: "inconsistency",
				name: "Inconsistency",
				description:
					"Inconsistency is a common problem in AI systems, where the model generates conflicting or contradictory information. This can lead to confusion and mistrust.",
				error: true,
				why: "Your prompt does not provide enough context for the model to generate consistent information. This can lead to inconsistency and confusion.",
				solution:
					"Provide more context in your prompt to help the model generate consistent information. This will help prevent inconsistency and improve the quality of the generated content.",
			},
			{
				id: "bias",
				name: "Bias",
				description:
					"Bias is a common problem in AI systems, where the model generates biased or unfair information. This can lead to discrimination and unfair treatment.",
				error: false,
				why: "Your prompt does not provide enough context for the model to generate unbiased information. This can lead to bias and discrimination.",
				solution:
					"Provide more context in your prompt to help the model generate unbiased information. This will help prevent bias and improve the quality of the generated content.",
			},
			{
				id: "overfitting",
				name: "Overfitting",
				description:
					"Overfitting is a common problem in AI systems, where the model generates information that is too specific to the training data. This can lead to poor generalization and performance.",
				error: false,
				why: "Your prompt does not provide enough context for the model to generate generalizable information. This can lead to overfitting and poor performance.",
				solution:
					"Provide more context in your prompt to help the model generate generalizable information. This will help prevent overfitting and improve the quality of the generated content.",
			},
		].sort((a, b) => {
			if (a.error && !b.error) {
				return -1;
			} else if (!a.error && b.error) {
				return 1;
			} else {
				return 0;
			}
		})
	);
</script>

<svelte:head>
	<title>Hack My Prompt</title>
	<meta
		name="description"
		content="Hack My Prompt"
	/>
</svelte:head>

<div class="w-full max-w-[1100px] mx-auto p-4 pb-24">
	<Button
		size="sm"
		variant="secondary"
		href="/"
	>
		<ArrowLeft class="mr-2 h-4" />
		Back to home
	</Button>
	<PromptPageHeader {prompt} />
	<PromptPageProblemsList {problems} />
</div>
