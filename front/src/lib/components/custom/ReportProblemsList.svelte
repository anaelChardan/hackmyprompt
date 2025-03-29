<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import ReportProblem from "./ReportProblem.svelte";
	import { getResults } from "$lib";
	import { page } from "$app/stores";

	// let { problems } = $props();

	let sampleId: string = $derived($page.url.searchParams.get("sampleId") || "");
	let problems: any = $derived(getResults(sampleId) || []);

	//
	// 	$effect(() => {
	// 		if (sampleId) {
	// 			problems = getResults(sampleId);
	// 			console.log("Problems:", problems);
	// 		}
	// 	});

	const addSubjectIdToQueryParam = async (subjectId: string) => {
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set("subjectId", subjectId);
		window.history.pushState({}, "", newUrl);
		await goto(newUrl);
	};

	// onMount(() => {
	// 	if (sampleId) {
	// 		problems = getResults(sampleId);
	// 		console.log("Problems:", problems);
	// 	}
	// 	// If no subjectId is present in the URL, set the first subject as default
	// 	// const urlParams = new URLSearchParams(window.location.search);
	// 	// const subjectId = urlParams.get("subjectId");
	// 	// if (!subjectId && problems.length > 0) {
	// 	// 	addSubjectIdToQueryParam(problems[0].id);
	// 	// }
	// });
</script>

<div class="w-full overflow-y-auto">
	<!-- <p>
		Sample Id : {sampleId}
	</p> -->

	<!-- {#if problems && problems.length > 0}
		<pre>
			{JSON.stringify(problems, null, 2)}
		</pre>
	{/if} -->

	{#if problems && problems.length > 0}
		<div class="py-4 px-8 border-b bg-sidebar sticky top-0 shadow z-50">
			<p class="text-sm font-medium">
				{problems.length} problems
			</p>
		</div>
		<div class="grid">
			{#each problems as problem}
				<button
					onclick={() => {
						addSubjectIdToQueryParam(problem.id);
					}}
				>
					<ReportProblem {problem} />
				</button>
			{/each}
		</div>
	{/if}
</div>
