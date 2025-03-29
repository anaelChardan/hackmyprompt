<script lang="ts">
	import "../app.css";
	import { Toaster } from "$lib/components/ui/sonner/index.js";

	let { children } = $props();
</script>

<Toaster />

<div class="h-screen flex flex-col">
	<!-- TOP NAV -->
	<div class="sticky top-0 border-b p-4 flex items-center justify-between gap-3">
		<p class="font-bold">Hack_My_Prompt</p>
		<p class="text-sm text-muted-foreground">
			*All informations are provided for educational purposes only and are possibly inaccurate. Please do not use
			them in a real-world context and do your own research.
		</p>
	</div>
	<!-- CONTENT -->
	{@render children()}
</div>
