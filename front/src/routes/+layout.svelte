<script lang="ts">
	import "../app.css";
	import { Toaster } from "$lib/components/ui/sonner/index.js";

	let { children } = $props();
</script>

<Toaster />

<div class="h-screen flex flex-col">
	<!-- TOP NAV -->
	<div class="sticky top-0 border-b p-4">
		<p class="font-bold">Hack_My_Prompt</p>
	</div>
	<!-- CONTENT -->
	{@render children()}
</div>
