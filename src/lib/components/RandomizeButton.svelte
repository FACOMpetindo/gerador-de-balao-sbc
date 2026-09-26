<script lang="ts">
	import Dice5 from '@lucide/svelte/icons/dice-5';

	let { onclick }: { onclick: () => void } = $props();
</script>

<button
	class="cursor-pointer rounded-xl border border-zinc-800 p-1.5 text-zinc-400 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
	aria-label="Aleatorizar cores"
	title="Aleatorizar cores"
	{onclick}
>
	<Dice5 class="size-5" />
</button>
