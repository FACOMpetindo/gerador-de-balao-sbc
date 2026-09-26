const PNG_SCALE = 4;

function svgUrl(svg: SVGSVGElement) {
	const data = new XMLSerializer().serializeToString(svg);
	const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
	return URL.createObjectURL(blob);
}

function download(href: string, filename: string) {
	const link = document.createElement('a');
	link.href = href;
	link.download = filename;
	link.click();
}

export function downloadSVG(svg: SVGSVGElement, filename: string) {
	const url = svgUrl(svg);
	download(url, filename);
	URL.revokeObjectURL(url);
}

export function downloadPNG(svg: SVGSVGElement, filename: string) {
	const url = svgUrl(svg);
	const img = new Image();

	img.onload = () => {
		const canvas = document.createElement('canvas');
		canvas.width = svg.viewBox.baseVal.width * PNG_SCALE;
		canvas.height = svg.viewBox.baseVal.height * PNG_SCALE;

		// O SVG não tem tamanho intrínseco (width/height 100%), sem o destino explícito o Firefox desenha errado
		canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height);

		download(canvas.toDataURL('image/png'), filename);
		URL.revokeObjectURL(url);
	};

	img.src = url;
}
