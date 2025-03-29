<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "../ui/button/button.svelte";
	import { ArrowRight } from "@lucide/svelte";

	let {} = $props();

	const choices = [
		{
			id: "health",
			label: "Health",
			system_prompt:
				"You are a knowledgeable medical assistant providing accurate and helpful answers to patient inquiries.",
		},
		{
			id: "finance",
			label: "Finance",
			system_prompt:
				"You are a financial advisor offering clear and practical advice on personal finance matters.",
		},
		{
			id: "education",
			label: "Education",
			system_prompt:
				"You are an educational consultant helping users with learning strategies and academic guidance.",
		},
	];

	const addSampleToQueryParam = async (sampleId: string) => {
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set("sampleId", sampleId);
		window.history.pushState({}, "", newUrl);
		await goto(newUrl);
	};
</script>

<div class="flex items-center gap-4 py-24 px-12">
	{#each choices as choice}
		<div class="border rounded p-4 shadow max-w-sm hover:shadow-lg transition-all duration-75 ease-in-out">
			<p class="text-xl font-bold">
				{choice.label}
			</p>
			<p class="text-muted-foreground text-sm italic">
				{choice.system_prompt}
			</p>
			<div class="mt-4">
				<Button
					onclick={() => {
						addSampleToQueryParam(choice.id);
					}}
					size="sm"
					variant="outline"
				>
					See results
					<ArrowRight />
				</Button>
			</div>
		</div>
	{/each}
</div>
