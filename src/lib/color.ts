import type { BalloonColors } from './balloon';
import { randomBetween } from './random';

// https://www.w3.org/TR/WCAG22/#contrast-minimum
const MIN_CONTRAST = 4.5;

const HEX = /^#[0-9a-f]{6}([0-9a-f]{2})?$/i;

export function isHexColor(value: unknown): value is string {
	return typeof value === 'string' && HEX.test(value);
}

function hslToHex(h: number, s: number, l: number) {
	const a = s * Math.min(l, 1 - l);
	const channel = (n: number) => {
		const k = (n + h / 30) % 12;
		const value = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
		return Math.round(value * 255)
			.toString(16)
			.padStart(2, '0');
	};

	return `#${channel(0)}${channel(8)}${channel(4)}`;
}

// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
function luminance(hex: string) {
	const [r, g, b] = [1, 3, 5].map((i) => {
		const c = parseInt(hex.slice(i, i + 2), 16) / 255;
		return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});

	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio
export function contrast(a: string, b: string) {
	const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (lighter + 0.05) / (darker + 0.05);
}

function randomColor() {
	return hslToHex(randomBetween(0, 360), randomBetween(0.4, 0.9), randomBetween(0.05, 0.95));
}

export function randomColors(): BalloonColors {
	let colors: BalloonColors;

	do {
		colors = { fill: randomColor(), stroke: randomColor() };
	} while (contrast(colors.fill, colors.stroke) < MIN_CONTRAST);

	return colors;
}
