<script lang="ts">
	let { prompt } = $props();
</script>

<div class="flex flex-col gap-4 items-center justify-center">
	<p class="mb-2 text-sm text-muted-foreground">Your current prompt</p>
	<div class="p-4 bg-sidebar rounded-md border max-w-3xl">
		<p class="font-mono text-center text-balance">
			{prompt}
		</p>
	</div>
</div>
