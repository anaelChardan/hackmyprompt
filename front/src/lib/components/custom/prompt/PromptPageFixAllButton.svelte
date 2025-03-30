<script lang="ts">
	import { page } from "$app/stores";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Sparkles } from "@lucide/svelte";

	let promptId = $derived($page.params.id);

	let loadingBetterPrompt = $state(false);
	const getBetterPrompt = async () => {
		loadingBetterPrompt = true;
		try {
			const res = await fetch("http://localhost:3555/agents/" + promptId);
			const body = await res.json();
			console.log(body);
		} catch (error) {
			console.log(error);
		} finally {
			loadingBetterPrompt = false;
		}
	};
</script>

<Button
	class="bg-purple-600 text-white max-w-max hover:bg-purple-700 transition-colors duration-200 ease-in-out"
	onclick={getBetterPrompt}
>
	{#if loadingBetterPrompt}
		Loading...
	{:else}
		Fix them all
		<Sparkles />
	{/if}
</Button>
