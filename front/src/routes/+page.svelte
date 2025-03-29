<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { ArrowRight, BadgeEuroIcon, BriefcaseMedical, Building2, PlaneTakeoff, Smile } from "@lucide/svelte";

	const samples = $state([
		{
			id: "health",
			icon: BriefcaseMedical,
			label: "Medical Assistant",
			description: "A medical assistant that can provide information about health conditions and treatments.",
		},
		{
			id: "legal",
			icon: Building2,
			label: "Legal Assistant",
			description: "A legal assistant that can provide information about laws and regulations.",
		},
		{
			id: "finance",
			icon: BadgeEuroIcon,
			label: "Financial Advisor",
			description: "A financial advisor that can provide information about investments and savings.",
		},
		{
			id: "travel",
			icon: PlaneTakeoff,
			label: "Travel Guide",
			description: "A travel guide that can provide information about destinations and travel tips.",
		},
		{
			id: "education",
			icon: Smile,
			label: "Educational Assistant",
			description: "An educational assistant that can provide information about courses and learning resources.",
		},
	]);
</script>

<svelte:head>
	<title>Hack My Prompt</title>
	<meta
		name="description"
		content="Hack My Prompt est une application éducative permettant d'améliorer vos compétences en prompt engineering et apprendre les risques d'attaques sur les agents AI."
	/>
</svelte:head>

<div class="h-full overflow-hidden flex flex-col items-center justify-between">
	<div class="w-full max-w-4xl text-balance grid gap-4 text-center pt-16">
		<h1 class="text-5xl">Bullet proof your system's prompts.</h1>
		<p class="text-3xl text-muted-foreground font-light">
			Improve prompt engineering skills and learn strategies to protect and educate against agent hacking.
		</p>
	</div>

	<div class="flex flex-col gap-2 justify-center">
		<p class="text-muted-foreground text-center text-lg">some examples</p>
		<div class="grid grid-cols-3 gap-4 p-4 max-w-5xl">
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
						<p class="text-sm text-muted-foreground my-4 text-balance">
							{sample.description}
						</p>
					</div>
					<Button
						variant="outline"
						class="max-w-max"
					>
						View result
						<ArrowRight class="h-4 ml-2" />
					</Button>
				</div>
			{/each}
		</div>
	</div>
</div>
