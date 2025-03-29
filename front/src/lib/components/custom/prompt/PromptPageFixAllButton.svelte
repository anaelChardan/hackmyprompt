<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { Sparkles } from "@lucide/svelte";

	let {} = $props();
</script>

<Button class="bg-purple-600 text-white max-w-max hover:bg-purple-700 transition-colors duration-200 ease-in-out">
	Fix them all
	<Sparkles />
</Button>
