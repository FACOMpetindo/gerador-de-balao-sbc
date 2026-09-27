<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		label,
		href,
		onclick,
		children
	}: { label: string; href?: string; onclick?: () => void; children: Snippet } = $props();

	const className =
		'block cursor-pointer rounded-xl border border-line p-1.5 text-muted transition-colors hover:border-line-strong hover:bg-raised hover:text-fg';
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
