import facompetindo from '$lib/assets/facompetindo.png';
import facompetindoLampada from '$lib/assets/facompetindo-lampada.png';
import facompetindoLampadaPb from '$lib/assets/facompetindo-lampada-pb.png';
import facompetindoPb from '$lib/assets/facompetindo-pb.png';

export type Layer = 'fill' | 'stroke';

export type BalloonColors = Record<Layer, string>;

export type Logo =
	| 'sbc'
	| 'facompetindo'
	| 'facompetindo-pb'
	| 'facompetindo-lampada'
	| 'facompetindo-lampada-pb';

export type LogoOption = { key: Logo; name: string; src?: string; tinted?: boolean };

export const layers: { key: Layer; name: string }[] = [
	{ key: 'fill', name: 'Fundo' },
	{ key: 'stroke', name: 'Borda' }
];

export const logos: LogoOption[] = [
	{ key: 'sbc', name: 'SBC' },
	{ key: 'facompetindo', name: 'FACOMpetindo', src: facompetindo },
	{ key: 'facompetindo-pb', name: 'FACOMpetindo P&B', src: facompetindoPb, tinted: true },
	{ key: 'facompetindo-lampada', name: 'FACOMpetindo com lâmpada', src: facompetindoLampada },
	{
		key: 'facompetindo-lampada-pb',
		name: 'FACOMpetindo com lâmpada P&B',
		src: facompetindoLampadaPb,
		tinted: true
	}
];

export const defaultColors: BalloonColors = {
	fill: '#f6f0dc',
	stroke: '#000000'
};
