<script lang="ts">
	let { prompt } = $props();
</script>

<div>
	<p class="mb-2 text-sm text-muted-foreground">Your current prompt</p>
	<div class="p-4 bg-sidebar rounded-md border">
		<p class="font-mono">
			{prompt}
		</p>
	</div>
</div>
