<script lang="ts">
	import { page } from "$app/stores";
	import PromptPageFixAllButton from "./PromptPageFixAllButton.svelte";
	import PromptPagePrompt from "./PromptPagePrompt.svelte";

	let {
		promptName = "My first prompt",
		score = 1,
		prompt,
	}: {
		promptName?: string;
		score?: number;
		prompt: string;
	} = $props();

	const scoreColorClass = (score: number) => {
		console.dir({ score });
		if (score < 3) {
			return "text-red-500";
		} else if (score < 6) {
			return "text-orange-500";
		}
		return "text-green-500";
	};

	let colorclass = $derived(scoreColorClass(parseInt(score)));

	let better_prompt = $derived($page.url.searchParams.get("better_prompt"));
</script>

<div class="py-12 flex flex-col items-center justify-center gap-4">
	<div>
		<p class="text-sm text-muted-foreground">
			<span class="text-4xl font-bold {scoreColorClass(score)}">
				{better_prompt ? "7" : score}
			</span>
			/ 7
		</p>
	</div>

	<PromptPagePrompt {prompt} />
	<PromptPageFixAllButton />
</div>

<!-- <div class="flex flex-col gap-8 py-12">
	<div class="flex items-center justify-between gap-4">
		<h1>
			{promptName}
		</h1>
		<div>
			<p class="text-sm text-muted-foreground">
				<span class="text-4xl font-bold {scoreColorClass(score)}">
					{score}
				</span>
				/ 10
			</p>
		</div>
	</div>

</div> -->
