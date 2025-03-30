<script lang="ts">
	import Separator from "$lib/components/ui/separator/separator.svelte";
	import * as Accordion from "$lib/components/ui/accordion/index.js";
	import { AlertTriangle, Check, CheckCircle2 } from "@lucide/svelte";
	import { page } from "$app/stores";

	let { problems, passed } = $props();

	const firstLetterUpperCase = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
</script>

<div class="flex gap-8">
	<!-- <pre>
		Problems :
		{JSON.stringify(problems, null, 2)}
	</pre> -->
	<div class="flex flex-col w-1/2">
		<div class="mb-4 flex items-center w-full justify-center">
			<p
				class="bg-red-100 border-red-300 border rounded text-red-800 max-w-max px-3 py-1 flex items-center text-sm"
			>
				<AlertTriangle class="h-4 -ml-1 mr-2" />
				{problems.length}
				problem{problems.length > 1 ? "s" : ""}
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
			</Accordion.Root>
		{/each}
	</div>

	<Separator orientation="vertical" />

	<div class="flex flex-col w-1/2">
		<div class="mb-4 flex items-center w-full justify-center">
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
			<!-- <Accordion.Root type="single">
				<Accordion.Item value="item-1">
					<Accordion.Trigger
						class="w-full py-6"
						disabled
					>
						<div class="flex items-center gap-4 px-4 py-6">
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
					<Accordion.Content></Accordion.Content>
				</Accordion.Item>
			</Accordion.Root> -->
		{/each}
	</div>
</div>
