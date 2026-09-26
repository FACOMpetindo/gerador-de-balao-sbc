<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		label,
		href,
		onclick,
		children
	}: { label: string; href?: string; onclick?: () => void; children: Snippet } = $props();

	const className =
		'block cursor-pointer rounded-xl border border-zinc-800 p-1.5 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100';
</script>

{#if href}
	<a class={className} {href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
		{@render children()}
	</a>
{:else}
	<button class={className} aria-label={label} title={label} {onclick}>
		{@render children()}
	</button>
{/if}
