<script lang="ts">
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import { Check, X } from "@lucide/svelte";

	let { problems } = $props();
</script>

<div class="grid border-t">
	{#each problems as problem}
		<Collapsible.Root class="hover:bg-sidebar">
			<Collapsible.Trigger class="w-full py-6">
				<div class="flex items-center gap-4">
					{#if problem.error}
						<X class="h-6 text-red-500" />
					{:else}
						<Check class="h-6 text-green-500" />
					{/if}
					<div class="pl-4">
						<h2>
							{problem.name}
						</h2>
					</div>
				</div>
			</Collapsible.Trigger>
			<Collapsible.Content>
				<!-- DESCRIPTION -->
				<div>
					<h3>Description</h3>
					<p class="text-sm text-muted-foreground w-4/5 text-balance pb-8">
						{problem.description}
					</p>
				</div>
				<!-- SOLUTION -->
				{#if problem.error == true}
					<!-- content here -->
					<div>
						<h3>Possible solution</h3>
						<p class="text-sm text-muted-foreground w-4/5 text-balance pb-8">
							{problem.solution}
						</p>
					</div>
				{/if}
				<!-- WHY -->
			</Collapsible.Content>
		</Collapsible.Root>
		<Separator />
	{/each}
</div>
