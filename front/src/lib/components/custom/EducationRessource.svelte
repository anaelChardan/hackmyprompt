<script lang="ts">
	import { Separator } from "$lib/components/ui/separator/index.js";
	import Progress from "../ui/progress/progress.svelte";

	let { subject } = $props();
</script>

<div>
	<div class="grid gap-3">
		<p class="font-bold text-3xl">
			{subject.label}
		</p>
		<p class="text-balance">
			{subject.description}
		</p>
	</div>
	<Separator class="my-4" />
	<pre>
    {JSON.stringify(subject, null, 2)}
    </pre>
</div>
