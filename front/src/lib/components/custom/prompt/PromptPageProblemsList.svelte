<script lang="ts">
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import { AlertTriangle, Check, CheckCircle2 } from "@lucide/svelte";

	let { problems, passed } = $props();

	const firstLetterUpperCase = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
</script>

<div class="grid gap-24 mt-12">
	<!-- <pre>
		Problems :
		{JSON.stringify(problems, null, 2)}
	</pre> -->
	<div class="grid">
		<div class="mb-4 flex items-center w-full justify-center">
			<p
				class="bg-red-100 border-red-300 border rounded text-red-800 max-w-max px-3 py-1 flex items-center text-sm"
			>
				<AlertTriangle class="h-4 -ml-1 mr-2" />
				{problems.length}
				problems
			</p>
		</div>

		{#each problems as problem}
			<Accordion.Root
				type="single"
				class="hover:bg-sidebar"
			>
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="w-full py-6">
						<div class="flex items-center gap-4 px-4">
							<AlertTriangle class="h-6 text-red-500 shrink-0" />

							<div class="pl-4 flex flex-col text-left">
								<h2>
									{problem.vulnerability_kind.charAt(0).toUpperCase() +
										problem.vulnerability_kind.slice(1)}
								</h2>
								<p class="text-sm text-muted-foreground w-4/5 text-balance">
									{problem.description}
								</p>
							</div>
						</div>
					</Accordion.Trigger>
					<Accordion.Content>
						<div class="pl-24">
							<h3>Why your prompt is problematic</h3>
							<p class="text-sm text-muted-foreground w-4/5 text-balance pb-8">
								{problem.error_detected}
							</p>
							<div class="py-2">
								<p class="text-sm text-muted-foreground w-4/5 text-balance pb-8">
									The user prompt that hacked your system prompt :
								</p>
								<p class="px-2 py-2 font-mono border bg-white max-w-lg rounded text-lg">
									{problem.test_prompt}
								</p>
							</div>
						</div>
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

		{#each passed as pass}
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
							<Check class="h-6 text-green-500 shrink-0" />

							<div class="pl-4 flex flex-col text-left">
								<h2>
									{pass.name}
								</h2>
								<p class="text-sm text-muted-foreground w-4/5 text-balance">
									{pass.description}
								</p>
							</div>
						</div>
					</Accordion.Trigger>
					<Accordion.Content>
						<!-- SOLUTION -->
						<!-- {#if problem.error == true}
							<div class="pl-24">
								<h3>Possible solution</h3>
								<p class="text-sm text-muted-foreground w-4/5 text-balance pb-8">
									{problem.solution}
								</p>
							</div>
						{/if}


						{#if problem.error == true}
							<div class="pl-24">
								<h3>Why the prompt problems</h3>
								<p class="text-sm text-muted-foreground w-4/5 text-balance pb-8">
									{problem.why}
								</p>
							</div>
						{/if} -->
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>
			<Separator />
		{/each}
	</div>
</div>
