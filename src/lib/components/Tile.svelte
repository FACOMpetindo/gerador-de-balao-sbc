<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	let {
		title,
		class: className,
		children
	}: { title?: string; class?: ClassValue; children: Snippet } = $props();
</script>

<section class={['rounded-3xl border border-zinc-800 bg-zinc-900 p-6', className]}>
	{#if title}
		<h2 class="mb-4 text-sm text-zinc-400">{title}</h2>
	{/if}
	{@render children()}
</section>
