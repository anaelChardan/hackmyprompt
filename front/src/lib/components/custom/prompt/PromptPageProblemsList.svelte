<script lang="ts">
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import { AlertTriangle, Check, CheckCircle, CheckCircle2, Filter, X } from "@lucide/svelte";

	let { problems } = $props();
</script>

<div class="grid gap-24 mt-12">
	<div class="grid">
		<div class="mb-4">
			<p
				class="bg-red-100 border-red-300 border rounded text-red-800 max-w-max px-3 py-1 flex items-center text-sm"
			>
				<AlertTriangle class="h-4 -ml-1 mr-2" />
				Failed
			</p>
		</div>

		{#each problems.filter((el: any) => el.error === true) as problem}
			<Collapsible.Root class="hover:bg-sidebar">
				<Collapsible.Trigger class="w-full py-6">
					<div class="flex items-center gap-4 px-4">
						{#if problem.error}
							<AlertTriangle class="h-6 text-red-500" />
						{:else}
							<Check class="h-6 text-green-500" />
						{/if}
						<div class="pl-4 flex flex-col text-left">
							<h2>
								{problem.name}
							</h2>
							<p class="text-sm text-muted-foreground w-4/5 text-balance">
								{problem.description}
							</p>
						</div>
					</div>
				</Collapsible.Trigger>
				<Collapsible.Content>
					<!-- SOLUTION -->
					{#if problem.error == true}
						<div class="pl-24">
							<h3>Possible solution</h3>
							<p class="text-sm text-muted-foreground w-4/5 text-balance pb-8">
								{problem.solution}
							</p>
						</div>
					{/if}

					<!-- WHY -->
					{#if problem.error == true}
						<div class="pl-24">
							<h3>Why the prompt failed</h3>
							<p class="text-sm text-muted-foreground w-4/5 text-balance pb-8">
								{problem.why}
							</p>
						</div>
					{/if}
				</Collapsible.Content>
			</Collapsible.Root>
			<Separator />
		{/each}
	</div>

	<div class="grid">
		<div class="mb-4">
			<p
				class="bg-green-100 border-green-300 border rounded text-green-800 max-w-max px-3 py-1 flex items-center text-sm"
			>
				<AlertTriangle class="h-4 -ml-1 mr-2" />
				Passed
			</p>
		</div>

		{#each problems.filter((el: any) => el.error === false) as problem}
			<Collapsible.Root class="hover:bg-sidebar">
				<Collapsible.Trigger
					class="w-full py-6"
					disabled
				>
					<div class="flex items-center gap-4">
						{#if problem.error}
							<AlertTriangle class="h-6 text-red-500" />
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
</div>
