<script lang="ts">
	import { layers, type BalloonColors, type Layer } from '$lib/balloon';

	let { colors, selected = $bindable() }: { colors: BalloonColors; selected: Layer } = $props();
</script>

<div class="grid grid-cols-2 gap-3">
	{#each layers as layer (layer.key)}
		<button
			class={[
				'flex cursor-pointer items-center gap-3 rounded-2xl border p-2 text-left transition-colors',
				selected === layer.key
					? 'border-zinc-500 bg-zinc-800'
					: 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
			]}
			aria-pressed={selected === layer.key}
			onclick={() => (selected = layer.key)}
		>
			<span
				class="size-10 shrink-0 rounded-xl border border-white/10"
				style:background-color={colors[layer.key]}
			></span>
			<span class="min-w-0">
				<span class="block text-sm">{layer.name}</span>
				<span class="block truncate text-xs text-zinc-500 uppercase">{colors[layer.key]}</span>
			</span>
		</button>
	{/each}
</div>
