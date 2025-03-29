<script lang="ts">
	import { page } from "$app/stores";
	import SubjectItem from "./SubjectItem.svelte";

	let { subjects } = $props();

	let selectedSubject = $derived($page.url.searchParams.get("subjectId"));
</script>

<div class="p-4 w-full overflow-y-auto">
	{#if selectedSubject}
		<SubjectItem subject={subjects.find((el: any) => el.id == selectedSubject)} />
	{/if}
</div>
