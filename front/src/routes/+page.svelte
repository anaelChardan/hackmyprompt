<script lang="ts">
	import EducationRessources from "$lib/components/custom/EducationRessources.svelte";
	import ReportStats from "$lib/components/custom/ReportStats.svelte";
	import UserInput from "$lib/components/custom/UserInput.svelte";

	const getInputValue = (value: string) => {
		console.log("Input value:", value);
		inputValue = value;
	};

	let inputValue = $state("");
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
		<ReportStats />
		<EducationRessources />
	</div>
</div>
