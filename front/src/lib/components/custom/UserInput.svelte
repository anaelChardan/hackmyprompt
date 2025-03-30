<script lang="ts">
	import { onMount } from "svelte";

	let { getInputValue } = $props();

	let placeholder = $state("");
	let inputValue = $state("");

	const placeholders = [
		"Déposez votre system prompt ci-dessous… et laissez l'équipe rouge en faire son terrain de jeu.",
		"Hack My Prompt est une application éducative pour muscler vos compétences en prompt engineering.",
		"Découvrez comment un system prompt peut devenir une faille — et comment l'éviter.",
		"Explorez les attaques, défendez vos system prompts, et dominez l'art du prompt engineering avec Hack My Prompt.",
	];

	let currentIndex = 0;
	let showCursor = true;

	const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

	const blink = async () => {
		while (true) {
			showCursor = !showCursor;
			await sleep(500);
		}
	};

	const typeWriterEffect = async (text: string) => {
		let typed = "";
		for (let i = 0; i < text.length; i++) {
			typed += text[i];
			placeholder = typed + (showCursor ? " |" : "");
			await sleep(50);
		}
		await sleep(2000);
		for (let i = text.length; i >= 0; i--) {
			typed = text.slice(0, i);
			placeholder = typed + (showCursor ? " |" : "");
			await sleep(25);
		}
	};

	const animateInputPlaceholder = async () => {
		blink(); // Lancer le clignotement en parallèle
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
