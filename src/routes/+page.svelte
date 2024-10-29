<script lang="ts">
  import { onMount } from "svelte";

  import Balao from "$lib/Balao.svelte"; 
	import ColorPicker from 'svelte-awesome-color-picker';

  let colors = $state([
    "#f6f0dc",
    "#000000",
  ]);

  const colorsDescription = [
    "Cor de fundo",
    "Cor da borda",
  ];

  let hex = $state('');

  let selectedColor = $state(0);

  onMount(() => {
    const storedColors = sessionStorage.getItem("colors");
    if (storedColors) {
      colors = JSON.parse(storedColors);
    }
    
    hex = colors[0];
  });
  
  $effect(() => {
    colors[selectedColor] = hex;
  });


  $effect(() => {
    if (!hex) return;
    sessionStorage.setItem("colors", JSON.stringify(colors));
  });

  function downloadAsSVG() {
    const svg = document.querySelector("svg");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const element = document.createElement("a");
    element.href = url;
    element.download = `balao-${hex}.svg`;
    element.click();
    element.remove();

    URL.revokeObjectURL(url);
  }

  function downloadAsPNG() {
    const svg = document.querySelector("svg");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = svg.viewBox.baseVal.width * 4;
        canvas.height = svg.viewBox.baseVal.height * 4;

        const ctx = canvas.getContext("2d");
        // @ts-ignore
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const element = document.createElement("a");
        element.href = canvas.toDataURL("image/png");
        element.download = `balao-${hex}.png`;
        element.click();
        element.remove();

        URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  function changeSelectedColor(index: number) {
    hex = colors[index];
    selectedColor = index;
  }

</script>


<div class="container mx-auto min-h-screen flex flex-col justify-center">
  <div class="flex flex-col justify-center items-center grow">
    <div class="mx-4 sm:mx-0">
      <h1 class="text-3xl text-center font-bold my-4">Gerador de balão SBC</h1>
      <p class="font-light">Um simples gerador de cor para balões, com possibilidade de exportar para SVG e PNG.</p>
    </div>
    <div class="flex flex-col sm:flex-row my-4 gap-4 sm:gap-8 items-center">
      <div class="dark">
        <div class="flex mx-2 gap-3 mb-[10px] h-10">
          {#each colors as color, i}
            <button class="button grow p-1" onclick={() => changeSelectedColor(i)} aria-label="{colorsDescription[i]}">
              <div class="size-full rounded" style="background-color: {color}"></div>
            </button>
          {/each}
        </div>
        <ColorPicker
          bind:hex
          isDialog={false}
        />
  
        <div class="flex mx-2 gap-3">
          <button class="button grow px-6 py-2" onclick={downloadAsSVG}>SVG</button>
          <button class="button grow px-6 py-2" onclick={downloadAsPNG}>PNG</button>
        </div>
      </div>
      <div class="order-first sm:order-none h-60 sm:h-[30rem]">
        <Balao fillColor={colors[0]} strokeColor={colors[1]} />
      </div>
    </div>
  </div>

  <footer class="mb-1">
    <p class="text-center text-xs">Feito com ❤️ por Vinícius - 2024</p>
  </footer>
</div>


<style>
  .dark {
    --cp-bg-color: #3f3f46; /** zinc-700 */
		--cp-border-color: #52525b; ; /** zinc-600 */
		--cp-text-color: white;
		--cp-input-color: #52525b; ; /** zinc-600 */
		--cp-button-hover-color: #71717a; ; /** zinc-500 */
  }

  .button {
    @apply rounded bg-zinc-700 border border-zinc-600 hover:bg-zinc-600;
  }
</style>
