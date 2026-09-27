<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import Link from '@lucide/svelte/icons/link';

	import type { BalloonColors, Logo } from '$lib/balloon';
	import { shareUrl } from '$lib/share';
	import IconButton from './IconButton.svelte';

	let { colors, logo }: { colors: BalloonColors; logo: Logo } = $props();

	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout>;

	async function copy() {
		await navigator.clipboard.writeText(shareUrl(colors, logo));

		copied = true;
		clearTimeout(timeout);
		timeout = setTimeout(() => (copied = false), 2000);
	}
</script>

<IconButton label="Copiar link" onclick={copy}>
	{#if copied}
		<Check class="size-5 text-success" />
	{:else}
		<Link class="size-5" />
	{/if}
</IconButton>
<span class="sr-only" aria-live="polite">{copied ? 'Link copiado' : ''}</span>
