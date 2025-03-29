<script lang="ts">
	import { page } from "$app/stores";
	import Separator from "../ui/separator/separator.svelte";
	import vulnerabilities from "$lib/vulnerabilities.json";

	// let { problem } = $props();

	let currentVuln = $derived(vulnerabilities.find((v) => v.id === $page.url.searchParams.get("subjectId")));
</script>

<div class="p-8 w-full overflow-y-auto">
	<!-- <p>
		Subject Id : {$page.url.searchParams.get("subjectId")}
	</p> -->
	{#if currentVuln}
		<div class="flex flex-col gap-8">
			<p class="text-3xl font-bold">{currentVuln.name}</p>
			<Separator class="my-4" />

			<div class="grid gap-2">
				<p class="font-bold text-xl">What is is about ?</p>
				<p>
					{currentVuln.description}
				</p>
			</div>
			<div class="grid gap-2">
				<p class="font-bold text-xl">Why the prompt can be hacked ?</p>
				<p>
					{currentVuln.why}
				</p>
			</div>
			<div class="grid gap-2">
				<p class="font-bold text-xl">How to do better ?</p>
				<p>
					{currentVuln.better}
				</p>
			</div>
			<div class="grid gap-2">
				<p class="font-bold text-xl">Useful links</p>
				{#each currentVuln.links as link}
					{#if link}
						<a
							class="text-blue-500 hover:underline"
							href={link}
							target="_blank"
						>
							{link}
						</a>
					{/if}
				{/each}
			</div>
		</div>

		<!-- <pre>
				{JSON.stringify(currentVuln, null, 2)}
			</pre> -->

		<!-- <pre>
				{JSON.stringify(vulnerabilities, null, 2)}
			</pre> -->
	{/if}
</div>
