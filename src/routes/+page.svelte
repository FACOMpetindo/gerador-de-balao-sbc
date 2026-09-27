<script lang="ts">
	import { onMount, tick } from 'svelte';

	import { replaceState } from '$app/navigation';

	import { defaultColors, logos, type BalloonColors, type Layer, type Logo } from '$lib/balloon';
	import { randomColors } from '$lib/color';
	import { readShared } from '$lib/share';
	import Balao from '$lib/components/Balao.svelte';
	import ColorEditor from '$lib/components/ColorEditor.svelte';
	import ExportButtons from '$lib/components/ExportButtons.svelte';
	import Favicon from '$lib/components/Favicon.svelte';
	import FloatingBalloons from '$lib/components/FloatingBalloons.svelte';
	import GithubIcon from '$lib/components/GithubIcon.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import LayerSelector from '$lib/components/LayerSelector.svelte';
	import LogoPicker from '$lib/components/LogoPicker.svelte';
	import RandomizeButton from '$lib/components/RandomizeButton.svelte';
	import SavedPalettes from '$lib/components/SavedPalettes.svelte';
	import ShareButton from '$lib/components/ShareButton.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Tile from '$lib/components/Tile.svelte';

	const COLORS_KEY = 'balloon-colors';
	const LOGO_KEY = 'balloon-logo';

	let colors: BalloonColors = $state({ ...defaultColors });
	let selected: Layer = $state('fill');
	let logo: Logo = $state('sbc');
	let svg: SVGSVGElement | undefined = $state();
	let floatingBalloons: FloatingBalloons | undefined = $state();

	const logoOption = $derived(logos.find((option) => option.key === logo));

	onMount(() => {
		const storedColors = sessionStorage.getItem(COLORS_KEY);
		if (storedColors) colors = JSON.parse(storedColors);

		const storedLogo = sessionStorage.getItem(LOGO_KEY);
		if (logos.some((option) => option.key === storedLogo)) logo = storedLogo as Logo;

		const url = new URL(location.href);
		if (!url.search) return;

		const shared = readShared(url.searchParams);
		colors = { ...colors, ...shared.colors };
		if (shared.logo) logo = shared.logo;

		url.search = '';
		tick().then(() => replaceState(url, {}));
	});

	$effect(() => {
		sessionStorage.setItem(COLORS_KEY, JSON.stringify(colors));
	});

	$effect(() => {
		sessionStorage.setItem(LOGO_KEY, logo);
	});
</script>

<Favicon {svg} />

<div class="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-4 p-4 sm:p-6">
	<main class="grid grid-cols-1 gap-4 xl:grid-cols-[4fr_5fr_5fr]">
		<Tile class="relative min-h-104">
			<div class="absolute inset-8">
				<Balao fillColor={colors.fill} strokeColor={colors.stroke} logo={logoOption} bind:svg />
			</div>
		</Tile>

		<div class="contents xl:flex xl:flex-col xl:gap-4">
			<Tile class="order-first xl:order-0">
				<h1 class="text-3xl font-bold xl:text-2xl">Gerador de balão SBC</h1>
				<p class="mt-3 text-sm text-muted">
					Um simples gerador de cor para balões, com possibilidade de exportar para SVG e PNG.
				</p>
			</Tile>

			<Tile title="Camada">
				{#snippet actions()}
					<RandomizeButton onclick={() => (colors = randomColors())} />
				{/snippet}
				<LayerSelector {colors} bind:selected />
				<SavedPalettes bind:colors />
			</Tile>

			<Tile title="Logo" class="xl:grow">
				{#snippet actions()}
					<span class="text-xs text-subtle">{logoOption?.name}</span>
				{/snippet}
				<LogoPicker {colors} bind:logo />
			</Tile>
		</div>

		<div class="contents xl:flex xl:flex-col xl:gap-4">
			<Tile title="Cor" class="xl:grow">
				<ColorEditor bind:hex={colors[selected]} />
			</Tile>

			<div class="flex gap-4">
				<Tile title="Exportar" class="grow">
					{#snippet actions()}
						<ShareButton {colors} {logo} />
					{/snippet}
					<ExportButtons
						{svg}
						filename="balao-{colors.fill.slice(1)}"
						onexport={() => floatingBalloons?.launch()}
					/>
				</Tile>

				<Tile class="flex flex-col justify-center gap-2">
					<IconButton label="Repositório no GitHub" href="https://github.com/FACOMpetindo/gerador-de-balao-sbc">
						<GithubIcon class="size-5" />
					</IconButton>
					<ThemeToggle />
				</Tile>
			</div>
		</div>
	</main>
</div>

<FloatingBalloons
	bind:this={floatingBalloons}
	fillColor={colors.fill}
	strokeColor={colors.stroke}
	logo={logoOption}
/>
