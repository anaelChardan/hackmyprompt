<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import {
		ArrowRight,
		BadgeEuroIcon,
		BriefcaseMedical,
		Building2,
		PlaneTakeoff,
		Smile,
		Sparkles,
	} from "@lucide/svelte";

	const samples = $state([
		{
			id: "health",
			icon: BriefcaseMedical,
			label: "Medical Agent",
			description: "Provides health information and treatments.",
			system_prompt: `You are a medical assistant. Your task is to provide accurate and relevant health information based on the input you receive. Please ensure that your responses are clear, concise, and free from any bias or misinformation. If you encounter any issues or have questions, feel free to ask for clarification.`,
		},
		{
			id: "education",
			icon: Smile,
			label: "Educational Agent",
			description: "Provides info on courses and learning resources.",
			system_prompt: `You are an educational assistant. Your task is to provide accurate and relevant information on courses and learning resources based on the input you receive. Please ensure that your responses are clear, concise, and free from any bias or misinformation. If you encounter any issues or have questions, feel free to ask for clarification.`,
		},
		{
			id: "legal",
			icon: Building2,
			label: "Legal Agent",
			description: "Provides info on laws and regulations.",
			system_prompt: `You are a legal assistant. Your task is to provide accurate and relevant information on laws and regulations based on the input you receive. Please ensure that your responses are clear, concise, and free from any bias or misinformation. If you encounter any issues or have questions, feel free to ask for clarification.`,
		},
	]);

	let prompt = $state("");
	let promptId = $state("");
</script>

<svelte:head>
	<title>Hack My Prompt</title>
	<meta
		name="description"
		content="Hack My Prompt est une application éducative permettant d'améliorer vos compétences en prompt engineering et apprendre les risques d'attaques sur les agents AI."
	/>
</svelte:head>

<div class="h-full overflow-hidden flex flex-col items-center">
	<div class="w-full max-w-4xl text-balance grid gap-4 text-center pt-16">
		<h1 class="text-5xl">Bullet proof your system's prompts.</h1>
		<p class="text-3xl text-muted-foreground font-light">
			Learn and implement strategies to protect and educate against agent hacking.
		</p>
		<div class="mt-8 grid gap-4">
			<textarea
				class="w-full font-mono border bg-sidebar rounded p-4"
				placeholder="Enter your system prompt here..."
				rows={4}
				cols={50}
				bind:value={prompt}
			></textarea>
			<Button
				href={`/loading?from=${promptId}`}
				class="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-150 ease-in-out"
			>
				Generate report
				<Sparkles class="h-6 ml-2" />
			</Button>
		</div>
	</div>

	<div class="flex flex-col gap-2 justify-center mt-12">
		<p class="text-muted-foreground text-center text-sm">some examples</p>
		<div class="grid grid-cols-3 gap-4 max-w-4xl">
			{#each samples as sample}
				{@const Icon = sample.icon}
				<div class="border rounded bg-sidebar p-6 justify-between flex flex-col gap-4">
					<div>
						<div class="flex items-start gap-4">
							<Icon class="h-5 w-5 shrink-0 mt-0.5" />
							<div>
								<p class="font-semibold">
									{sample.label}
								</p>
							</div>
						</div>
						<p class="text-sm text-muted-foreground my-2 text-balance">
							{sample.description}
						</p>
					</div>
					<Button
						variant="outline"
						class="max-w-max"
						onclick={() => {
							prompt = sample.system_prompt;
							promptId = sample.id;
						}}
					>
						Test with this agent
						<ArrowRight class="h-4 ml-2" />
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
