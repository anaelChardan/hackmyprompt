<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import ReportProblem from "./ReportProblem.svelte";

	let { problems } = $props();

	const addSubjectIdToQueryParam = async (subjectId: string) => {
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set("subjectId", subjectId);
		window.history.pushState({}, "", newUrl);
		await goto(newUrl);
	};

	onMount(() => {
		// If no subjectId is present in the URL, set the first subject as default
		const urlParams = new URLSearchParams(window.location.search);
		const subjectId = urlParams.get("subjectId");
		if (!subjectId && problems.length > 0) {
			addSubjectIdToQueryParam(problems[0].id);
		}
	});
</script>

<div class="w-full overflow-y-auto">
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
</div>
