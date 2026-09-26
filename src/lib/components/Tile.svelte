<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	let {
		title,
		class: className,
		actions,
		children
	}: { title?: string; class?: ClassValue; actions?: Snippet; children: Snippet } = $props();
</script>

<section class={['rounded-3xl border border-zinc-800 bg-zinc-900 p-6', className]}>
	{#if title || actions}
		<div class="mb-4 flex items-center justify-between">
			{#if title}
				<h2 class="text-sm text-zinc-400">{title}</h2>
			{/if}
			{@render actions?.()}
		</div>
	{/if}
	{@render children()}
</section>
