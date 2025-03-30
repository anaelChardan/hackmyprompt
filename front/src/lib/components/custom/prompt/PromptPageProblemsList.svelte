<script lang="ts">
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import { AlertTriangle, Check, CheckCircle2, ChevronDown } from "@lucide/svelte";
	import { page } from "$app/stores";

	let { problems, passed } = $props();

	const firstLetterUpperCase = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
</script>

<div class="flex gap-8 mt-12">
	<div class="flex flex-col w-1/2 gap-4">
		<div class="mb-4 flex flex-col items-center w-full justify-center">
			<div>
				<p class="text-2xl gap-4 font-bold mb-4">Learn from your mistakes</p>
			</div>
			<p
				class="bg-red-100 border-red-300 border rounded text-red-800 max-w-max px-3 py-1 flex items-center text-sm"
			>
				<AlertTriangle class="h-4 -ml-1 mr-2" />
				{problems.length}
				problem{problems.length > 1 ? "s" : ""}
			</p>
		</div>

		<!-- <pre>
			{JSON.stringify(problems, null, 2)}
		</pre> -->

		{#each problems as problem}
			<!-- <div class="flex items-center gap-4 px-4 py-6">
				<AlertTriangle class="h-6 text-red-500 shrink-0" />
				<div class="pl-4 flex flex-col text-left">
					<h2>
						{problem.name || problem.vulnerability_kind}
					</h2>
					<p class="text-sm text-muted-foreground text-balance">
						{problem.description}
					</p>
				</div>
			</div> -->

			<!-- <Accordion.Root>
				<Accordion.Item value="item-1">
					<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
					<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root> -->

			<Collapsible.Root class="py-8">
				<Collapsible.Trigger class="flex justify-between">
					<div class="flex items-center gap-4 px-4">
						<AlertTriangle class="h-6 text-red-500 shrink-0" />
						<div class="pl-4 flex flex-col text-left">
							<h2>
								{problem.vulnerability_kind.charAt(0).toUpperCase() +
									problem.vulnerability_kind.slice(1)}
							</h2>
							<p class="text-sm text-muted-foreground text-balance">
								{problem.description}
							</p>
							<p class="underline text-muted-foreground mt-4">See more</p>
						</div>
					</div>

					<ChevronDown />
				</Collapsible.Trigger>
				<Collapsible.Content>
					<div class="pl-24 pr-12 pt-8">
						<div class="grid gap-4">
							<div class="grid gap-2">
								<h3>The user prompt that hacked your system prompt</h3>
								<p class="px-2 py-2 font-mono border bg-white max-w-lg rounded">
									{problem.test_prompt}
								</p>
							</div>
							<div class="grid gap-2">
								<h3>The response of the agent</h3>
								<p class="px-2 py-2 font-mono border bg-white max-w-lg rounded">
									{problem.test_result.slice(0, 500) + "..."}
								</p>
							</div>
							<div class="grid gap-2">
								<h3>Why your prompt is problematic</h3>
								<p class="text-sm text-muted-foreground text-balance pb-8">
									{problem.error_detected}
								</p>
							</div>
						</div>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
			<Separator />

			<!-- <Accordion.Root class="hover:bg-sidebar">
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="w-full py-6">
						trigger
						<div class="flex items-center gap-4 px-4">
							<AlertTriangle class="h-6 text-red-500 shrink-0" />
							<div class="pl-4 flex flex-col text-left">
								<h2>
									{problem.vulnerability_kind.charAt(0).toUpperCase() +
										problem.vulnerability_kind.slice(1)}
								</h2>
								<p class="text-sm text-muted-foreground text-balance">
									{problem.description}
								</p>
							</div>
						</div>
					</Accordion.Trigger>
					<Accordion.Content>
						<div class="pl-24 pr-12">
							<div class="grid gap-4">
								<div class="grid gap-2">
									<h3>The user prompt that hacked your system prompt</h3>
									<p class="px-2 py-2 font-mono border bg-white max-w-lg rounded">
										{problem.test_prompt}
									</p>
								</div>
								<div class="grid gap-2">
									<h3>The response of the agent</h3>
									<p class="px-2 py-2 font-mono border bg-white max-w-lg rounded">
										{problem.test_result.slice(0, 500) + "..."}
									</p>
								</div>
								<div class="grid gap-2">
									<h3>Why your prompt is problematic</h3>
									<p class="text-sm text-muted-foreground text-balance pb-8">
										{problem.error_detected}
									</p>
								</div>
							</div>
						</div>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root> -->
		{/each}
	</div>

	<Separator orientation="vertical" />

	<div class="flex flex-col w-1/2">
		<div class="mb-4 flex flex-col items-center w-full justify-center">
			<div>
				<p class="text-2xl gap-4 font-bold mb-4">What you did well</p>
			</div>
			<p
				class="bg-green-100 border-green-300 border rounded text-green-800 max-w-max px-3 py-1 flex items-center text-sm"
			>
				<CheckCircle2 class="h-4 -ml-1 mr-2" />
				{passed.length} Passed
			</p>
		</div>

		{#each passed as pass}
			<div class="flex items-center gap-4 px-4 py-6">
				<Check class="h-6 text-green-500 shrink-0" />

				<div class="pl-4 flex flex-col text-left">
					<h2>
						{pass.name || pass.vulnerability_kind}
					</h2>
					<p class="text-sm text-muted-foreground text-balance">
						{pass.description}
					</p>
				</div>
			</div>

			<Separator />
		{/each}
	</div>
</div>
