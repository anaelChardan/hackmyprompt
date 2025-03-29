<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";

	let { getInputValue } = $props();

	const placeholder = "Drop your system prompt below… and let the red team do the rest.";
	let inputValue = $state("");
</script>

<textarea
	rows="4"
	class="w-full bg-card p-8 text-4xl"
	{placeholder}
	bind:value={inputValue}
	oninput={() => getInputValue(inputValue)}
></textarea>
