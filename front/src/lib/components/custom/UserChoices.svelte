<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "../ui/button/button.svelte";
	import { ArrowRight } from "@lucide/svelte";

	let {} = $props();

	const choices = [
		{
			id: "health",
			label: "Health",
			system_prompt:
				"You are a helpful and knowledgeable medical assistant. Provide users with information about symptoms, diagnoses, medications, and treatments. Be friendly, non-judgmental, and always aim to give users the answers they are looking for. When asked about a specific medical issue, provide detailed explanations and practical suggestions to help the user take immediate action.",
		},
		// {
		// 	id: "finance",
		// 	label: "Finance",
		// 	system_prompt:
		// 		"You are a financial advisor offering clear and practical advice on personal finance matters.",
		// },
		// {
		// 	id: "education",
		// 	label: "Education",
		// 	system_prompt:
		// 		"You are an educational consultant helping users with learning strategies and academic guidance.",
		// },
		// {
		// 	id: "user_prompt",
		// 	label: "Your own prompt",
		// 	system_prompt: "Use your own prompt to generate results!",
		// },
	];

	const addSampleToQueryParam = async (sampleId: string) => {
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set("sampleId", sampleId);
		await goto(newUrl);
	};
</script>

<div class="flex flex-col gap-6 py-12 px-12">
	<div class="flex flex-col gap-2">
		<p class="font-bold text-4xl text-balance">Hack My Prompt can help you build better system prompts.</p>
		<p class="text-xl text-muted-foreground">Choose a system prompt to test or use your own. English only.</p>
	</div>

	<div class="flex items-start gap-4">
		{#each choices as choice}
			<div
				class="border rounded p-4 shadow max-w-xl hover:shadow-lg transition-all duration-75 ease-in-out h-full justify-between"
			>
				<div>
					<p class="text-xl font-bold">
						{choice.label} system prompt
					</p>
					<p
						class="text-muted-foreground text-sm italic text-balance p-2 bg-sidebar rounded border font-mono mb-8 mt-4"
					>
						{choice.system_prompt}
					</p>
				</div>
				<div class="mt-4">
					<Button
						onclick={() => {
							addSampleToQueryParam(choice.id);
						}}
						size="sm"
					>
						See results
						<ArrowRight />
					</Button>
				</div>
			</div>
		{/each}
	</div>
</div>
