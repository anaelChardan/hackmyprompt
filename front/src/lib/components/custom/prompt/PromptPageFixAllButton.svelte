<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Sparkles } from "@lucide/svelte";

	let promptId = $derived($page.params.id);

	let loadingBetterPrompt = $state(false);
	let betterPrompt = $state("");
	let whyBetterPrompt = $state("");
	const getBetterPrompt = async () => {
		loadingBetterPrompt = true;
		const res = await fetch("http://localhost:3555/agents/" + promptId);
		console.log(res);
		const body = await res.json();
		console.log(body);
		betterPrompt = body.better_system_prompt;
		whyBetterPrompt = body.reason_why_this_is_better;
		loadingBetterPrompt = false;
	};
</script>

{#if betterPrompt}
	<div class="p-4 bg-sidebar rounded-md max-w-3xl border-2 border-green-500">
		<p class="font-mono text-center text-balance">
			{betterPrompt}
		</p>
	</div>
{/if}

{#if whyBetterPrompt}
	<p class="text-sm font-bold">Why this is better</p>
	<p class="text-sm text-muted-foreground text-center">
		{whyBetterPrompt}
	</p>
{/if}

<Button
	class="bg-purple-600 text-white max-w-max hover:bg-purple-700 transition-colors duration-200 ease-in-out"
	onclick={getBetterPrompt}
	disabled={loadingBetterPrompt}
>
	{#if loadingBetterPrompt}
		Loading...
	{:else}
		Fix them all
		<Sparkles />
	{/if}
</Button>
