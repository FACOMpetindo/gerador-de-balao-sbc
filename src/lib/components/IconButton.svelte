<script lang="ts">
	import type { Snippet } from 'svelte';

	let { label, onclick, children }: { label: string; onclick: () => void; children: Snippet } =
		$props();
</script>

<button
	class="cursor-pointer rounded-xl border border-zinc-800 p-1.5 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
	aria-label={label}
	title={label}
	{onclick}
>
	{@render children()}
</button>
