<script lang="ts">
	import { onMount } from "svelte";
	import { getResults } from "$lib";
	import ReportProblemsList from "$lib/components/custom/ReportProblemsList.svelte";
	import ProblemSolution from "$lib/components/custom/ProblemSolution.svelte";
	import UserChoices from "$lib/components/custom/UserChoices.svelte";
	import { page } from "$app/stores";

	// const getInputValue = (value: string) => {
	// 	console.log("Input value:", value);
	// 	inputValue = value;
	// };

	// let inputValue = $state("");

	// let problems: any = $state([]);

	// let sampleId = $derived($page.url.searchParams.get("sampleId"));
	// let problems = $derived(getResults(sampleId));
	// let problem = $state(null);

	// onMount(() => {
	// 	// get the sampleId from the URL
	// 	const urlParams =
	// 	problems = getResults();
	// 	console.log("Problems:", problems);
	// });
</script>

<svelte:head>
	<title>Hack My Prompt</title>
	<meta
		name="description"
		content="Hack My Prompt est une application éducative permettant d'améliorer vos compétences en prompt engineering et apprendre les risques d'attaques sur les agents AI."
	/>
</svelte:head>

<div class="h-full overflow-hidden flex flex-col">
	<!-- <UserInput {getInputValue} /> -->
	<UserChoices />
	<div class="border divide-x flex-1 h-full flex overflow-hidden">
		<ReportProblemsList />
		<!-- <ProblemSolution {problem} /> -->
	</div>
</div>
