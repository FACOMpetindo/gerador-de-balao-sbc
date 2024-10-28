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

  function downloadAsSVG() {
    const svg = document.querySelector("svg");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const element = document.createElement("a");
    element.href = url;
    element.download = "balao.svg";
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
        canvas.width = svg.width.baseVal.value;
        canvas.height = svg.height.baseVal.value;

        const ctx = canvas.getContext("2d");
        // @ts-ignore
        ctx.drawImage(img, 0, 0);

        const element = document.createElement("a");
        element.href = canvas.toDataURL("image/png");
        element.download = "imagem.png";
        element.click();
        element.remove();

        URL.revokeObjectURL(url);
    };
    img.src = url;
  }

</script>

<div class="container mx-auto h-screen flex flex-col justify-center items-center">
  <h1 class="text-3xl font-bold my-4">Gerador de balão SBC</h1>
  <p class="font-light">Um simples gerador de cor para balões, com possibilidade de exportar para svg e png.</p>
  <div class="flex my-4 gap-8 items-center">
    <div class="dark">
      <ColorPicker
        bind:rgb
        bind:hsv
        bind:hex
        isDialog={false}
      />

      <div class="flex mx-2 gap-3">
        <button class="bg-zinc-700 hover:bg-zinc-600 grow px-6 py-2 rounded" onclick={downloadAsSVG}>SVG</button>
        <button class="bg-zinc-700 hover:bg-zinc-600 grow px-6 py-2 rounded" onclick={downloadAsPNG}>PNG</button>
      </div>
    </div>
    <Balao color={hex} />
  </div>
</div>

<footer class="fixed bottom-0 w-screen">
  <p class="text-center text-xs">Feito com ❤️ por Vinícius - 2024</p>
</footer>

<style>
  .dark {
    --cp-bg-color: #3f3f46;
		--cp-border-color: #52525b;
		--cp-text-color: white;
		--cp-input-color: #52525b;
		--cp-button-hover-color: #71717a;
  }
</style>
