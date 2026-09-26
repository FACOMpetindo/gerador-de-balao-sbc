const PNG_SCALE = 4;

function blobToDataURL(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(blob);
	});
}

const dataURLs = new Map<string, Promise<string>>();

function toDataURL(src: string) {
	let dataURL = dataURLs.get(src);
	if (!dataURL) {
		dataURL = fetch(src)
			.then((response) => response.blob())
			.then(blobToDataURL);
		dataURLs.set(src, dataURL);
	}
	return dataURL;
}

export async function inlineImages(svg: SVGSVGElement) {
	const clone = svg.cloneNode(true) as SVGSVGElement;

	for (const image of clone.querySelectorAll('image')) {
		image.setAttribute('href', await toDataURL(image.href.baseVal));
	}

	return clone;
}

async function svgUrl(svg: SVGSVGElement) {
	const data = new XMLSerializer().serializeToString(await inlineImages(svg));
	const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
	return URL.createObjectURL(blob);
}

function download(href: string, filename: string) {
	const link = document.createElement('a');
	link.href = href;
	link.download = filename;
	link.click();
}

export async function downloadSVG(svg: SVGSVGElement, filename: string) {
	const url = await svgUrl(svg);
	download(url, filename);
	URL.revokeObjectURL(url);
}

export async function downloadPNG(svg: SVGSVGElement, filename: string) {
	const url = await svgUrl(svg);
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
