<script lang="ts">
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
		if (score < 4) {
			return "text-red-500";
		} else if (score < 7) {
			return "text-yellow-500";
		} else {
			return "text-green-500";
		}
	};
</script>

<div class="py-12 flex flex-col items-center justify-center gap-4">
	<div>
		<p class="text-sm text-muted-foreground">
			<span class="text-4xl font-bold {scoreColorClass(score)}">
				{score}
			</span>
			/ 10
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
