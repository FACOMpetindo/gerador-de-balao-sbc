<script lang="ts">
	import Plus from '@lucide/svelte/icons/plus';
	import X from '@lucide/svelte/icons/x';
	import { onMount } from 'svelte';

	import type { BalloonColors } from '$lib/balloon';
	import { isHexColor } from '$lib/color';

	const STORAGE_KEY = 'balloon-palettes';
	const MAX_PALETTES = 7;

	let { colors = $bindable() }: { colors: BalloonColors } = $props();

	let palettes: BalloonColors[] = $state([]);

	const isCurrent = (palette: BalloonColors) =>
		palette.fill === colors.fill && palette.stroke === colors.stroke;
	const saved = $derived(palettes.some(isCurrent));

	function isPalette(value: unknown): value is BalloonColors {
		const palette = value as BalloonColors | null;
		return isHexColor(palette?.fill) && isHexColor(palette?.stroke);
	}

	onMount(() => {
		try {
			const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
			if (Array.isArray(stored)) palettes = stored.filter(isPalette).slice(0, MAX_PALETTES);
		} catch {
			localStorage.removeItem(STORAGE_KEY);
		}
	});

	function persist(next: BalloonColors[]) {
		palettes = next;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
	}

	function save() {
		const current = { fill: colors.fill, stroke: colors.stroke };
		persist([current, ...palettes.filter((palette) => !isCurrent(palette))].slice(0, MAX_PALETTES));
	}

	function remove(index: number) {
		persist(palettes.filter((_, i) => i !== index));
	}
</script>

<div class="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Paletas salvas">
	<button
		class="flex size-7 cursor-pointer items-center justify-center rounded-full border border-dashed border-zinc-600 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-100 disabled:cursor-default disabled:opacity-40 disabled:hover:border-zinc-600 disabled:hover:text-zinc-400"
		aria-label="Salvar paleta"
		title={saved ? 'Paleta já salva' : 'Salvar paleta'}
		disabled={saved}
		onclick={save}
	>
		<Plus class="size-4" />
	</button>

	{#each palettes as palette, i (`${palette.fill}${palette.stroke}`)}
		<div class="group relative">
			<button
				class={[
					'block size-7 cursor-pointer rounded-full border-4 ring-offset-2 ring-offset-zinc-900 transition-transform hover:scale-110',
					isCurrent(palette) ? 'ring-2 ring-zinc-400' : 'ring-1 ring-white/10'
				]}
				style:background-color={palette.fill}
				style:border-color={palette.stroke}
				aria-label="Aplicar paleta: fundo {palette.fill}, borda {palette.stroke}"
				title="Fundo {palette.fill} · Borda {palette.stroke}"
				onclick={() => (colors = { ...palette })}
			></button>
			<button
				class="absolute -top-1.5 -right-1.5 hidden size-4 cursor-pointer items-center justify-center rounded-full bg-zinc-700 text-zinc-200 group-focus-within:flex group-hover:flex hover:bg-zinc-600 pointer-coarse:flex"
				aria-label="Remover paleta: fundo {palette.fill}, borda {palette.stroke}"
				title="Remover"
				onclick={() => remove(i)}
			>
				<X class="size-3" />
			</button>
		</div>
	{:else}
		<span class="text-xs text-zinc-500">Salve combinações para usar depois</span>
	{/each}
</div>
