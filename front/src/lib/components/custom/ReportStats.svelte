<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import ReportStat from "./ReportStat.svelte";

	let { subjects } = $props();

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
		if (!subjectId && subjects.length > 0) {
			addSubjectIdToQueryParam(subjects[0].id);
		}
	});
</script>

<div class="w-full overflow-y-auto">
	<div class="py-4 px-8 border-b bg-sidebar sticky top-0 shadow z-50">
		<p class="text-sm font-medium">
			{subjects.length} subjects
		</p>
	</div>
	<div class="grid">
		{#each subjects as subject}
			<button
				onclick={() => {
					addSubjectIdToQueryParam(subject.id);
				}}
			>
				<ReportStat {subject} />
			</button>
		{/each}
	</div>
</div>
