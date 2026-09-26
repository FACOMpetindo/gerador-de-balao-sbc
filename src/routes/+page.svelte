<script lang="ts">
	import { onMount } from 'svelte';

	import { defaultColors, logos, type BalloonColors, type Layer, type Logo } from '$lib/balloon';
	import { randomColors } from '$lib/color';
	import Balao from '$lib/components/Balao.svelte';
	import ColorEditor from '$lib/components/ColorEditor.svelte';
	import ExportButtons from '$lib/components/ExportButtons.svelte';
	import LayerSelector from '$lib/components/LayerSelector.svelte';
	import LogoPicker from '$lib/components/LogoPicker.svelte';
	import RandomizeButton from '$lib/components/RandomizeButton.svelte';
	import Tile from '$lib/components/Tile.svelte';

	const COLORS_KEY = 'balloon-colors';
	const LOGO_KEY = 'balloon-logo';

	let colors: BalloonColors = $state({ ...defaultColors });
	let selected: Layer = $state('fill');
	let logo: Logo = $state('sbc');
	let svg: SVGSVGElement | undefined = $state();

	const logoSrc = $derived(logos.find((option) => option.key === logo)?.src);

	onMount(() => {
		const storedColors = sessionStorage.getItem(COLORS_KEY);
		if (storedColors) colors = JSON.parse(storedColors);

		const storedLogo = sessionStorage.getItem(LOGO_KEY);
		if (logos.some((option) => option.key === storedLogo)) logo = storedLogo as Logo;
	});

	$effect(() => {
		sessionStorage.setItem(COLORS_KEY, JSON.stringify(colors));
	});

	$effect(() => {
		sessionStorage.setItem(LOGO_KEY, logo);
	});
</script>

<div class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-4 p-4 sm:p-6">
	<main class="grid grid-cols-1 gap-4 xl:grid-cols-[4fr_5fr_5fr]">
		<Tile class="relative min-h-104">
			<div class="absolute inset-8">
				<Balao fillColor={colors.fill} strokeColor={colors.stroke} {logoSrc} bind:svg />
			</div>
		</Tile>

		<div class="contents xl:flex xl:flex-col xl:gap-4">
			<Tile class="order-first xl:order-0">
				<h1 class="text-3xl font-bold xl:text-2xl">Gerador de balão SBC</h1>
				<p class="mt-3 text-sm text-zinc-400">
					Um simples gerador de cor para balões, com possibilidade de exportar para SVG e PNG.
				</p>
			</Tile>

			<Tile title="Camada">
				{#snippet actions()}
					<RandomizeButton onclick={() => (colors = randomColors())} />
				{/snippet}
				<LayerSelector {colors} bind:selected />
			</Tile>

			<Tile title="Logo" class="xl:grow">
				<LogoPicker {colors} bind:logo />
			</Tile>
		</div>

		<div class="contents xl:flex xl:flex-col xl:gap-4">
			<Tile title="Cor" class="xl:grow">
				<ColorEditor bind:hex={colors[selected]} />
			</Tile>

			<Tile title="Exportar">
				<ExportButtons {svg} filename="balao-{colors.fill.slice(1)}" />
			</Tile>
		</div>
	</main>
</div>
