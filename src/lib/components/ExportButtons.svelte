<script lang="ts">
	import { downloadPNG, downloadSVG } from '$lib/export';

	let {
		svg,
		filename,
		onexport
	}: { svg?: SVGSVGElement; filename: string; onexport?: () => void } = $props();

	const formats = [
		{ label: 'SVG', download: downloadSVG, extension: 'svg' },
		{ label: 'PNG', download: downloadPNG, extension: 'png' }
	];

	async function exportAs(format: (typeof formats)[number]) {
		if (!svg) return;

		await format.download(svg, `${filename}.${format.extension}`);
		onexport?.();
	}
</script>

<div class="grid grid-cols-2 gap-3">
	{#each formats as format (format.extension)}
		<button
			class="cursor-pointer rounded-2xl border border-line py-3 font-bold transition-colors hover:border-line-strong hover:bg-raised"
			disabled={!svg}
			onclick={() => exportAs(format)}
		>
			{format.label}
		</button>
	{/each}
</div>
