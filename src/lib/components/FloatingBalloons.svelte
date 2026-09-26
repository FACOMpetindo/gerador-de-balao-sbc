<script lang="ts">
	import { randomBetween } from '$lib/random';
	import Balao from './Balao.svelte';

	let {
		fillColor,
		strokeColor,
		logoSrc
	}: { fillColor: string; strokeColor: string; logoSrc?: string } = $props();

	type FloatingBalloon = {
		id: number;
		left: number;
		width: number;
		depth: number;
		duration: number;
		delay: number;
		sway: number;
	};

	let balloons: FloatingBalloon[] = $state([]);
	let nextId = 0;

	function balloonCount() {
		if (innerWidth >= 1024) return 24;
		if (innerWidth >= 768) return 12;
		return 6;
	}

	export function launch(count = balloonCount()) {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		for (let i = 0; i < count; i++) {
			const depth = Math.random();

			balloons.push({
				id: nextId++,
				left: randomBetween(0, 95),
				width: 4 + depth * 4,
				depth,
				duration: 7 - depth * 3,
				delay: randomBetween(0, 1),
				sway: randomBetween(1.5, 3)
			});
		}
	}

	function remove(id: number) {
		balloons = balloons.filter((balloon) => balloon.id !== id);
	}
</script>

<div class="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
	{#each balloons as balloon (balloon.id)}
		<div
			class="rise"
			style:left="{balloon.left}%"
			style:width="{balloon.width}rem"
			style:z-index={Math.round(balloon.depth * 10)}
			style:filter="brightness({0.6 + balloon.depth * 0.4})"
			style:animation-duration="{balloon.duration}s"
			style:animation-delay="{balloon.delay}s"
			onanimationend={() => remove(balloon.id)}
		>
			<div class="sway" style:animation-duration="{balloon.sway}s">
				<Balao {fillColor} {strokeColor} {logoSrc} />
			</div>
		</div>
	{/each}
</div>

<style>
	.rise {
		position: absolute;
		top: 100%;
		animation: rise linear both;
	}

	.sway {
		height: 100%;
		transform-origin: 50% 100%;
		animation: sway ease-in-out infinite alternate;
	}

	@keyframes rise {
		to {
			transform: translateY(calc(-100vh - 100%));
		}
	}

	@keyframes sway {
		from {
			transform: rotate(-6deg);
		}
		to {
			transform: rotate(6deg);
		}
	}
</style>
