export type Layer = 'fill' | 'stroke';

export type BalloonColors = Record<Layer, string>;

export const layers: { key: Layer; name: string }[] = [
	{ key: 'fill', name: 'Fundo' },
	{ key: 'stroke', name: 'Borda' }
];

export const defaultColors: BalloonColors = {
	fill: '#f6f0dc',
	stroke: '#000000'
};
