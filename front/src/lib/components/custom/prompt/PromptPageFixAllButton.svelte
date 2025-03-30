<script lang="ts">
	import { goto } from "$app/navigation";
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
		// add '?better_prompt=true' to the url
		const currentUrl = $page.url.pathname;
		const newUrl = currentUrl + "?better_prompt=true";
		await goto(newUrl, {
			replaceState: false,
		});
	};

	const transformWhyBetterPrompt = (str) => {
		// split by - and make each part a new line
		const parts = str.split("-");
		const transformedParts = parts.map((part) => {
			// remove leading and trailing spaces
			const trimmedPart = part.trim();
			// add a new line
			return trimmedPart;
		});

		// join the parts with a new line
		const transformedStr = transformedParts.join("\n");
		return transformedStr;
	};
</script>

{#if !betterPrompt}
	<Button
		class="bg-indigo-600 text-white w-full max-w-sm hover:bg-indigo-700 transition-colors duration-200 ease-in-out"
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
{/if}

{#if betterPrompt}
	<p class="text-xl font-bold">Secured version of your system prompt</p>

	<div class="p-4 bg-sidebar rounded-md max-w-3xl border-2 border-green-500">
		<p class="font-mono text-balance">
			{betterPrompt}
		</p>
	</div>
{/if}

{#if whyBetterPrompt}
	<p class="text-xl font-bold">Why this is better ✨</p>
	<!-- <p class="text-lg max-w-3xl text-balance">
		{whyBetterPrompt}
		{transformWhyBetterPrompt(whyBetterPrompt)}
	</p> -->
	<div class="grid gap-2 max-w-3xl">
		<p class="whitespace-pre-line text-balance">
			{whyBetterPrompt.replace("**", "")}
		</p>
	</div>
{/if}
