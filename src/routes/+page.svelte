<script>
  import Balao from "$lib/Balao.svelte"; 
	import ColorPicker from 'svelte-awesome-color-picker';

  let hex = $state("#f6f0dc");

  let rgb = $state({
    "r": 246,
    "g": 240,
    "b": 220,
    "a": 1
  })

  let hsv = $state({
    "h": 46,
    "s": 11,
    "v": 96,
    "a": 1
  });

</script>

<div class="container mx-auto flex flex-col justify-center items-center">
  <h1 class="text-3xl font-bold my-4">Gerador de balão SBC</h1>
  <p class="font-light">Um simples gerador de cor para balões, com possibilidade de exportar para svg e png.</p>
  <div class="flex my-4 gap-8 items-center">
    <!-- <input type="color" bind:value={color} /> -->
    <div class="dark">
      <ColorPicker
        bind:rgb
        bind:hsv
        bind:hex
        isDialog={false}
      />
      <div class="flex mx-2 gap-3">
        <button class="bg-zinc-700 grow px-6 py-2 rounded" >SVG</button>
        <button class="bg-zinc-700 grow px-6 py-2 rounded" >PNG</button>
      </div>
    </div>
    <Balao color={hex} />
  </div>
</div>

<style>
  .dark {
    --cp-bg-color: #333;
		--cp-border-color: #555;
		--cp-text-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
  }
</style>
