<script lang="ts">
	import { logos, type BalloonColors, type Logo } from '$lib/balloon';
	import SbcLogo, { logoArea } from './SbcLogo.svelte';

	const { x, y, width, height } = logoArea;

	let { colors, logo = $bindable() }: { colors: BalloonColors; logo: Logo } = $props();
</script>

<div class="grid grid-cols-5 gap-2">
	{#each logos as option (option.key)}
		<button
			class={[
				'cursor-pointer rounded-2xl border p-1.5 transition-colors',
				logo === option.key
					? 'border-zinc-500 bg-zinc-800'
					: 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
			]}
			aria-label={option.name}
			title={option.name}
			aria-pressed={logo === option.key}
			onclick={() => (logo = option.key)}
		>
			<span
				class="flex aspect-square items-center justify-center rounded-xl border border-white/10 p-1.5"
				style:background-color={colors.fill}
			>
				{#if option.tinted}
					<span
						class="size-full"
						style:background-color={colors.stroke}
						style:mask="url({option.src}) center / contain no-repeat"
					></span>
				{:else if option.src}
					<img class="size-full object-contain" src={option.src} alt="" />
				{:else}
					<svg class="size-full" viewBox="{x} {y} {width} {height}" fill={colors.stroke}>
						<SbcLogo />
					</svg>
				{/if}
			</span>
		</button>
	{/each}
</div>
