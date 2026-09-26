<script lang="ts">
	import { onMount } from 'svelte';

	import { defaultColors, type BalloonColors, type Layer } from '$lib/balloon';
	import { randomColors } from '$lib/color';
	import Balao from '$lib/components/Balao.svelte';
	import ColorEditor from '$lib/components/ColorEditor.svelte';
	import ExportButtons from '$lib/components/ExportButtons.svelte';
	import LayerSelector from '$lib/components/LayerSelector.svelte';
	import RandomizeButton from '$lib/components/RandomizeButton.svelte';
	import Tile from '$lib/components/Tile.svelte';

	const STORAGE_KEY = 'balloon-colors';

	let colors: BalloonColors = $state({ ...defaultColors });
	let selected: Layer = $state('fill');
	let svg: SVGSVGElement | undefined = $state();

	onMount(() => {
		const stored = sessionStorage.getItem(STORAGE_KEY);
		if (stored) colors = JSON.parse(stored);
	});

	$effect(() => {
		sessionStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
	});
</script>

<div class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-4 p-4 sm:p-6">
	<main class="grid grid-cols-1 gap-4 lg:grid-cols-12">
		<Tile class="lg:col-span-6 lg:col-start-7 lg:row-start-1">
			<h1 class="text-3xl font-bold sm:text-4xl">Gerador de balão SBC</h1>
			<p class="mt-3 text-sm text-zinc-400">
				Um simples gerador de cor para balões, com possibilidade de exportar para SVG e PNG.
			</p>
		</Tile>

		<Tile class="relative min-h-104 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1">
			<div class="absolute inset-8">
				<Balao fillColor={colors.fill} strokeColor={colors.stroke} bind:svg />
			</div>
		</Tile>

		<Tile title="Camada" class="lg:col-span-6 lg:col-start-7 lg:row-start-2">
			{#snippet actions()}
				<RandomizeButton onclick={() => (colors = randomColors())} />
			{/snippet}
			<LayerSelector {colors} bind:selected />
		</Tile>

		<Tile title="Cor" class="lg:col-span-4 lg:col-start-7 lg:row-start-3">
			<ColorEditor bind:hex={colors[selected]} />
		</Tile>

		<Tile title="Exportar" class="lg:col-span-2 lg:col-start-11 lg:row-start-3">
			<ExportButtons {svg} filename="balao-{colors.fill.slice(1)}" />
		</Tile>
	</main>
</div>
