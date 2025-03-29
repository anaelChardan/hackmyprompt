<script lang="ts">
	import { page } from "$app/stores";
	import Separator from "../ui/separator/separator.svelte";

	let { problem } = $props();

	let selectedSubject = $derived($page.url.searchParams.get("subjectId"));
</script>

<div class="p-4 w-full overflow-y-auto">
	<div class="flex flex-col gap-4">
		<p class="text-3xl font-bold">Test title</p>
		<p>
			Cupidatat laboris ipsum occaecat dolore ea cupidatat cupidatat nisi nisi. Cupidatat laboris ipsum occaecat
			dolore ea cupidatat cupidatat nisi nisi.
		</p>
	</div>

	<Separator class="my-4" />
</div>
