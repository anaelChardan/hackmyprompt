<script lang="ts">
	import { onMount } from "svelte";
	import EducationRessource from "./EducationRessource.svelte";
	import { page } from "$app/stores";

	let { subjects } = $props();

	let selectedSubject = $derived($page.url.searchParams.get("subjectId"));
</script>

<div class="p-4 w-full overflow-y-auto">
	{#if selectedSubject}
		<EducationRessource subject={subjects.find((el: any) => el.id == selectedSubject)} />
	{/if}
</div>
