<script lang="ts">
	import { page } from "$app/stores";

	let { problem } = $props();

	let selectedSubject = $derived($page.url.searchParams.get("subjectId"));
</script>

<div class="p-4 w-full overflow-y-auto">RIGHT</div>
