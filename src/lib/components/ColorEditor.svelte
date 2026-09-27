<script lang="ts">
	import ColorPicker from 'svelte-awesome-color-picker';

	let { hex = $bindable() }: { hex: string } = $props();
</script>

<div class="flex justify-center">
	<ColorPicker
		bind:hex={() => hex, (value) => value && (hex = value)}
		isDialog={false}
	/>
</div>

<style>
	div {
		--cp-bg-color: transparent;
		--cp-border-color: transparent;
		--cp-text-color: var(--fg);
		--cp-input-color: var(--raised);
		--cp-button-hover-color: var(--line-strong);
		--picker-width: 240px;
		--picker-height: 200px;
		--slider-width: 14px;
		--input-size: 28px;
	}

	div :global(.wrapper) {
		margin: 0;
		padding: 0;
	}
</style>
