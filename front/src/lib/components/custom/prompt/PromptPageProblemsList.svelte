<script lang="ts">
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import { AlertTriangle, Check, CheckCircle2 } from "@lucide/svelte";

	let { problems } = $props();

	let failed = $state(problems.filter((el: any) => el.error === true));
	let passed = $state(problems.filter((el: any) => el.error !== true));
</script>

<div class="grid gap-24 mt-12">
	<div class="grid">
		<div class="mb-4 flex items-center w-full justify-center">
			<p
				class="bg-red-100 border-red-300 border rounded text-red-800 max-w-max px-3 py-1 flex items-center text-sm"
			>
				<AlertTriangle class="h-4 -ml-1 mr-2" />
				{failed.length}
				Failed
			</p>
		</div>

		{#each failed as problem}
			<Accordion.Root
				type="single"
				class="hover:bg-sidebar"
			>
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="w-full py-6">
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
					</Accordion.Trigger>
					<Accordion.Content>
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
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
			<Separator />
		{/each}
	</div>

	<div class="grid">
		<div class="mb-4 flex items-center w-full justify-center">
			<p
				class="bg-green-100 border-green-300 border rounded text-green-800 max-w-max px-3 py-1 flex items-center text-sm"
			>
				<CheckCircle2 class="h-4 -ml-1 mr-2" />
				{passed.length} Passed
			</p>
		</div>

		{#each passed as problem}
			<Accordion.Root
				type="single"
				class="hover:bg-sidebar"
			>
				<Accordion.Item value="item-1">
					<Accordion.Trigger
						class="w-full py-6"
						disabled
					>
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
					</Accordion.Trigger>
					<Accordion.Content>
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
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
			<Separator />
		{/each}
	</div>
</div>
