<script lang="ts">
	import { Progress } from "$lib/components/ui/progress/index.js";

	let { problem } = $props();
</script>

<div class="p-8 hover:bg-sidebar flex gap-4 items-center border cursor-pointer">
	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-2 justify-start text-left">
			<p class="text-lg font-semibold">💥 {problem.label}</p>
			<p class="text-sm text-muted-foreground text-balance">
				{problem.description}
			</p>
		</div>
		<div>
			<p class="font-bold text-sm text-left">
				{problem.score}
				<span class="font-normal text-muted-foreground"> / 100 </span>
			</p>
		</div>
		<Progress
			class="h-2 bg-red-500"
			value={problem.score}
		/>
	</div>
</div>
