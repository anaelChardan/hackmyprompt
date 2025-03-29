<script lang="ts">
	import { onMount } from "svelte";

	let { getInputValue } = $props();

	let placeholder = $state("");
	let inputValue = $state("");

	const placeholders = [
		"Drop your system prompt below… and let the red team do the rest.",
		"Hack My Prompt is an educational application to improve your prompt engineering skills.",
		"Learn about AI agent attack vectors and how to defend against them.",
		"Explore the world of AI and prompt engineering with Hack My Prompt.",
	];

	let currentIndex = 0;

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	const typeWriterEffect = async (text: string) => {
		placeholder = "";
		for (let i = 0; i < text.length; i++) {
			placeholder += text[i];
			await sleep(50); // vitesse de frappe
		}
		await sleep(2000); // pause après l’écriture
		for (let i = text.length; i >= 0; i--) {
			placeholder = text.slice(0, i);
			await sleep(25); // vitesse d’effacement
		}
	};

	const animateInputPlaceholder = async () => {
		while (true) {
			await typeWriterEffect(placeholders[currentIndex]);
			currentIndex = (currentIndex + 1) % placeholders.length;
		}
	};

	onMount(() => {
		animateInputPlaceholder();
	});
</script>

<textarea
	rows="4"
	class="w-full bg-card p-8 text-4xl"
	{placeholder}
	bind:value={inputValue}
	oninput={() => getInputValue(inputValue)}
></textarea>
