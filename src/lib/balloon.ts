import facompetindo from '$lib/assets/facompetindo.png';
import facompetindoLampada from '$lib/assets/facompetindo-lampada.png';

export type Layer = 'fill' | 'stroke';

export type BalloonColors = Record<Layer, string>;

export type Logo = 'sbc' | 'facompetindo' | 'facompetindo-lampada';

export const layers: { key: Layer; name: string }[] = [
	{ key: 'fill', name: 'Fundo' },
	{ key: 'stroke', name: 'Borda' }
];

export const logos: { key: Logo; name: string; src?: string }[] = [
	{ key: 'sbc', name: 'SBC' },
	{ key: 'facompetindo', name: 'FACOMpetindo', src: facompetindo },
	{ key: 'facompetindo-lampada', name: 'FACOMpetindo com lâmpada', src: facompetindoLampada }
];

export const defaultColors: BalloonColors = {
	fill: '#f6f0dc',
	stroke: '#000000'
};
