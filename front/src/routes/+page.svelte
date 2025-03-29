<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import EducationRessources from "$lib/components/custom/EducationRessources.svelte";
	import ReportStats from "$lib/components/custom/ReportStats.svelte";
	import UserInput from "$lib/components/custom/UserInput.svelte";

	const getInputValue = (value: string) => {
		console.log("Input value:", value);
		inputValue = value;
	};

	let inputValue = $state("");

	const generateRandomScoreFromZeroToHundred = () => {
		return Math.floor(Math.random() * 101);
	};

	const subjects = [
		{
			id: "hijacking",
			label: "Hijacking",
			description:
				"Hijacking est un type d’attaque où l’attaquant prend le contrôle d’un agent AI en manipulant ses entrées ou en exploitant des vulnérabilités dans son code.",
			score: generateRandomScoreFromZeroToHundred(),
		},
		{
			id: "prompt_injection",
			label: "Prompt Injection",
			description:
				"Prompt Injection est une technique où l’attaquant insère des instructions malveillantes dans le prompt d’un agent AI pour manipuler son comportement.",
			score: generateRandomScoreFromZeroToHundred(),
		},
		{
			id: "data_leakage",
			label: "Data Leakage",
			description:
				"Data Leakage est un risque où des informations sensibles sont divulguées à travers les réponses d’un agent AI, souvent en raison de la mauvaise gestion des données d’entraînement.",
			score: generateRandomScoreFromZeroToHundred(),
		},
		{
			id: "adversarial_attacks",
			label: "Adversarial Attacks",
			description:
				"Adversarial Attacks sont des attaques où l’attaquant modifie les entrées d’un agent AI pour tromper son modèle et obtenir des résultats incorrects.",
			score: generateRandomScoreFromZeroToHundred(),
		},
		{
			id: "model_extraction",
			label: "Model Extraction",
			description:
				"Model Extraction est une attaque où l’attaquant tente de reproduire le modèle d’un agent AI en interrogeant le système avec des entrées soigneusement conçues.",
			score: generateRandomScoreFromZeroToHundred(),
		},
	];
</script>

<svelte:head>
	<title>Hack My Prompt</title>
	<meta
		name="description"
		content="Hack My Prompt est une application éducative permettant d'améliorer vos compétences en prompt engineering et apprendre les risques d'attaques sur les agents AI."
	/>
</svelte:head>

<div class="h-full overflow-hidden flex flex-col">
	<UserInput {getInputValue} />
	<div class="border divide-x flex-1 h-full flex overflow-hidden">
		<ReportStats {subjects} />
		<EducationRessources {subjects} />
	</div>
</div>
