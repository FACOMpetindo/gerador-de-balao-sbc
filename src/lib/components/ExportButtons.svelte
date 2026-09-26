<script lang="ts">
	import { downloadPNG, downloadSVG } from '$lib/export';

	let { svg, filename }: { svg?: SVGSVGElement; filename: string } = $props();

	const formats = [
		{ label: 'SVG', download: downloadSVG, extension: 'svg' },
		{ label: 'PNG', download: downloadPNG, extension: 'png' }
	];
</script>

<div class="grid grid-cols-2 gap-3">
	{#each formats as format (format.extension)}
		<button
			class="cursor-pointer rounded-2xl border border-zinc-800 py-3 font-bold transition-colors hover:border-zinc-700 hover:bg-zinc-800"
			disabled={!svg}
			onclick={() => svg && format.download(svg, `${filename}.${format.extension}`)}
		>
			{format.label}
		</button>
	{/each}
</div>
