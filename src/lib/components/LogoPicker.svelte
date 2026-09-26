<script lang="ts">
	import { logos, type BalloonColors, type Logo } from '$lib/balloon';
	import SbcLogo, { logoArea } from './SbcLogo.svelte';

	const { x, y, width, height } = logoArea;

	let { colors, logo = $bindable() }: { colors: BalloonColors; logo: Logo } = $props();
</script>

<div class="grid grid-cols-3 gap-3">
	{#each logos as option (option.key)}
		<button
			class={[
				'flex cursor-pointer flex-col items-center gap-2 rounded-2xl border p-2 transition-colors',
				logo === option.key
					? 'border-zinc-500 bg-zinc-800'
					: 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
			]}
			aria-pressed={logo === option.key}
			onclick={() => (logo = option.key)}
		>
			<span
				class="flex h-16 w-full items-center justify-center rounded-xl border border-white/10 p-2"
				style:background-color={colors.fill}
			>
				{#if option.src}
					<img class="size-full object-contain" src={option.src} alt="" />
				{:else}
					<svg class="size-full" viewBox="{x} {y} {width} {height}" fill={colors.stroke}>
						<SbcLogo />
					</svg>
				{/if}
			</span>
			<span class="text-center text-xs text-balance">{option.name}</span>
		</button>
	{/each}
</div>
