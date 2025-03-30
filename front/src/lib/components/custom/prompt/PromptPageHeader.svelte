<script lang="ts">
	import { page } from "$app/stores";
	import { Trophy } from "@lucide/svelte";
	import PromptPageFixAllButton from "./PromptPageFixAllButton.svelte";
	import PromptPagePrompt from "./PromptPagePrompt.svelte";

	let {
		promptName = "My first prompt",
		score = "1",
		prompt,
	}: {
		promptName?: string;
		score?: string;
		prompt: string;
	} = $props();

	const scoreColorClass = (scoreStr: string) => {
		const scoreN = parseInt(scoreStr);
		if (scoreN < 3) return "text-red-500";
		if (scoreN < 6) return "text-orange-500";
		return "text-green-500";
	};

	const textBasedOnScore = (score: string) => {
		const scoreN = parseInt(score);
		if (scoreN < 3) return "This system prompt is not good, be careful !";
		if (scoreN < 6) return "This system prompt is ok, but...";
		return "This prompt seems to be good !";
	};

	let text = $derived(textBasedOnScore(score));

	let better_prompt = $derived($page.url.searchParams.get("better_prompt"));
</script>

<div class="py-12 flex flex-col items-center justify-center gap-4">
	<div>
		<h1>
			{better_prompt ? "This system prompt is great!" : text}
		</h1>
		<!-- <p class="text-sm text-muted-foreground">
			<span class="text-4xl font-bold {scoreColorClass(better_prompt ? '7' : score)}">
				{better_prompt ? "7" : score}
			</span>
			/ 7
		</p> -->

		<div class="py-4 text-center">
			<p class="text-xl text-muted-foreground font-semibold">
				{better_prompt ? "7" : score} categories passed out of 7
			</p>
			<p class="text-xl text-muted-foreground font-semibold">for 345 differents tests.</p>
		</div>
	</div>

	<PromptPagePrompt {prompt} />
	<PromptPageFixAllButton />
</div>
