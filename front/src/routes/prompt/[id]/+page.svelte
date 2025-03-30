<script lang="ts">
	import { page } from "$app/stores";
	import PromptPageHeader from "$lib/components/custom/prompt/PromptPageHeader.svelte";
	import PromptPageProblemsList from "$lib/components/custom/prompt/PromptPageProblemsList.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { ArrowLeft } from "@lucide/svelte";

	let data = $derived($page.data);

	let prompt = $derived(data.prompt.vulnerabilities[0].input_system_prompt);
	let problems = $derived(data.prompt.vulnerabilities);
	let passed = $derived(data.prompt.passed_categories);
	let score = $derived(data.prompt.score);
	console.log("score", data.prompt.score);
	let better_prompt = $derived($page.url.searchParams.get("better_prompt"));
</script>

<svelte:head>
	<title>Hack My Prompt</title>
	<meta
		name="description"
		content="Hack My Prompt"
	/>
</svelte:head>

<div class="w-full max-w-[1100px] mx-auto p-4 pb-24">
	<!-- <pre>
        {JSON.stringify(data, null, 2)}
    </pre> -->
	<Button
		size="sm"
		variant="secondary"
		href="/"
	>
		<ArrowLeft class="mr-2 h-4" />
		Back to home
	</Button>
	<PromptPageHeader
		{prompt}
		{score}
	/>
	<PromptPageProblemsList
		problems={better_prompt ? [] : problems}
		passed={!better_prompt ? passed : [...problems, ...passed]}
	/>
</div>
