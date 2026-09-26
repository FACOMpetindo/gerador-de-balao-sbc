<script lang="ts">
	import Dice5 from '@lucide/svelte/icons/dice-5';
	import IconButton from './IconButton.svelte';

	let { onclick }: { onclick: () => void } = $props();
</script>

<IconButton label="Aleatorizar cores" {onclick}>
	<Dice5 class="size-5" />
</IconButton>
