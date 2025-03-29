<script lang="ts">
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import { Check, X } from "@lucide/svelte";

	let { problems } = $props();
</script>

<div class="grid border-t">
	{#each problems as problem}
		<Collapsible.Root>
			<Collapsible.Trigger class="w-full py-6">
				<div class="flex items-center gap-4">
					{#if problem.error}
						<X class="h-6 text-red-500" />
					{:else}
						<Check class="h-6 text-green-500" />
					{/if}
					<div class="pl-4">
						<p class="font-semibold">
							{problem.name}
						</p>
					</div>
				</div>
			</Collapsible.Trigger>
			<Collapsible.Content>
				<p class="text-sm text-muted-foreground text-balance w-2/3 pb-8">
					{problem.description}
				</p>
			</Collapsible.Content>
		</Collapsible.Root>
		<Separator />
	{/each}
</div>
