<script lang="ts">
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	import { Check } from "@lucide/svelte";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	const loadingItems = ["Checking hijackability", "Checking for prompt injection", "Checking for hallucination", "Checking for bias", "Checking for ethical issues"];

	let index = 0;
	let currentItem = loadingItems[index];
	let key = 0;

	const animateLoading = () => {
		const interval = setInterval(() => {
			index = (index + 1) % loadingItems.length;
			currentItem = loadingItems[index];
			key = Date.now(); // 🔥 force Svelte à recréer le bloc
		}, 1000);

		return () => clearInterval(interval);
	};

	const navigateToFromQueryParam = async () => {
		const next = $page.url.searchParams.get("from");
		await goto(`/prompt/${next}`);
	};

	onMount(() => {
		const stop = animateLoading();

		const timeout = setTimeout(() => {
			navigateToFromQueryParam();
		}, 4000); // ⏱️ 4 secondes

		return () => {
			stop();
			clearTimeout(timeout);
		};
	});
</script>

<div class="grid gap-8">
	<div class="w-full flex items-center justify-center min-h-[300px]">
		<h1>We're hacking your system prompt with 325 tests...</h1>
	</div>

	{#key key}
		<div
			in:fly={{ y: 20, duration: 300, delay: 300 }}
			out:fly={{ y: -20, duration: 300 }}
			class="flex items-center justify-center py-4"
		>
			<Check class="text-green-500 mr-4" />
			<p class="text-muted-foreground text-center text-xl">
				{currentItem}
			</p>
		</div>
	{/key}
</div>
