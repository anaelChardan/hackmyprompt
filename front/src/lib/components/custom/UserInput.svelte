<script lang="ts">
	import { onMount } from "svelte";

	let { getInputValue } = $props();

	let placeholder = $state("");
	let inputValue = $state("");

	const placeholders = [
		"Déposez votre invite système ci-dessous… et laissez l'équipe rouge faire le reste.",
		"Hack My Prompt est une application éducative pour améliorer vos compétences en ingénierie d'invite.",
		"Découvrez les vecteurs d'attaque des agents IA et comment vous en défendre.",
		"Explorez le monde de l'IA et de l'ingénierie d'invite avec Hack My Prompt.",
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
