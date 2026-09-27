import { logos, type BalloonColors, type Layer, type Logo } from './balloon';
import { isHexColor } from './color';

export function shareUrl(colors: BalloonColors, logo: Logo) {
	const url = new URL(location.href);
	url.hash = '';
	url.search = new URLSearchParams({
		fill: colors.fill.slice(1),
		stroke: colors.stroke.slice(1),
		logo
	}).toString();

	return url.href;
}

export function readShared(params: URLSearchParams) {
	const colors: Partial<BalloonColors> = {};

	for (const layer of ['fill', 'stroke'] satisfies Layer[]) {
		const hex = `#${params.get(layer)}`;
		if (isHexColor(hex)) colors[layer] = hex.toLowerCase();
	}

	const logo = logos.find((option) => option.key === params.get('logo'))?.key;

	return { colors, logo };
}
