import { Canvas } from 'src/app/classes/canvas.class';

export class PixelWar extends Canvas {
	constructor(wrapper: HTMLDivElement) {
		super({ wrapper, looperOption: { timespan: 100 } });

		this.start();
	}
}
