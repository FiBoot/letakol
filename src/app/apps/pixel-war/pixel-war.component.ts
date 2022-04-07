import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Canvas } from 'src/app/classes/canvas.class';
import { PixelWar } from './classes/pixel-war.class';

@Component({
	selector: 'app-pixel-war',
	templateUrl: './pixel-war.component.html',
	styleUrls: ['./pixel-war.component.css'],
})
export class PixelWarComponent implements AfterViewInit, OnDestroy {
	@ViewChild('pixelWarWrapper') wrapper: ElementRef;
	public app: Canvas;

	ngAfterViewInit() {
		setTimeout(() => {
			this.app = new PixelWar(this.wrapper.nativeElement);
		});
	}

	ngOnDestroy(): void {
		this.app.destroy();
	}
}
