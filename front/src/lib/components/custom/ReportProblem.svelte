<script lang="ts">
	let { problem } = $props();
</script>

<div class="p-8 hover:bg-sidebar flex gap-4 items-center border cursor-pointer">
	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-2 justify-start text-left">
			<p class="text-lg font-semibold">💥 {problem.label}</p>
		</div>
	</div>
</div>
