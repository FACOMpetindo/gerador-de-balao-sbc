<script lang="ts">
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { onMount } from 'svelte';

	import IconButton from './IconButton.svelte';

	const STORAGE_KEY = 'theme';

	function setDark(dark: boolean) {
		document.documentElement.classList.toggle('dark', dark);
	}

	function toggle() {
		const dark = !document.documentElement.classList.contains('dark');
		setDark(dark);
		localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
	}

	onMount(() => {
		const media = matchMedia('(prefers-color-scheme: dark)');
		const followSystem = (event: MediaQueryListEvent) => {
			if (!localStorage.getItem(STORAGE_KEY)) setDark(event.matches);
		};

		media.addEventListener('change', followSystem);
		return () => media.removeEventListener('change', followSystem);
	});
</script>

<IconButton label="Alternar tema claro/escuro" onclick={toggle}>
	<Sun class="hidden size-5 dark:block" />
	<Moon class="size-5 dark:hidden" />
</IconButton>
