<script lang="ts">
	import { page } from "$app/stores";
	let { prompt } = $props();

	let better_prompt = $derived($page.url.searchParams.get("better_prompt"));
</script>

<div class="flex flex-col gap-4 items-center justify-center {better_prompt ? 'opacity-50' : ''}">
	<p class="mb-2 text-xl font-bold text-muted-foreground">Your system prompt</p>
	<div class="p-4 bg-sidebar rounded-md border max-w-3xl">
		<p class="font-mono text-center text-balance">
			{prompt}
		</p>
	</div>
</div>
