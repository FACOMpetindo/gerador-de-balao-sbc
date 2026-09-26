<script lang="ts">
	import { inlineImages } from '$lib/export';

	const VIEW_BOX = '-47.75 -8 360 360';
	const OUTLINE_WIDTH = 10;

	let { svg }: { svg?: SVGSVGElement } = $props();

	let href: string | undefined = $state();

	async function render(source: SVGSVGElement) {
		const clone = await inlineImages(source);
		clone.setAttribute('viewBox', VIEW_BOX);
		clone.setAttribute('width', '64');
		clone.setAttribute('height', '64');

		const body = clone.querySelector('#Balão');
		body?.setAttribute('stroke', body.getAttribute('fill') ?? 'none');
		body?.setAttribute('stroke-width', String(OUTLINE_WIDTH));
		body?.setAttribute('stroke-linejoin', 'round');

		return `data:image/svg+xml,${encodeURIComponent(new XMLSerializer().serializeToString(clone))}`;
	}

	$effect(() => {
		if (!svg) return;

		const source = svg;
		let request = 0;

		async function update() {
			const current = ++request;
			const url = await render(source);
			if (current === request) href = url;
		}

		const observer = new MutationObserver(update);
		observer.observe(source, { attributes: true, childList: true, subtree: true });
		update();

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	{#if href}
		<link rel="icon" type="image/svg+xml" {href} />
	{/if}
</svelte:head>
