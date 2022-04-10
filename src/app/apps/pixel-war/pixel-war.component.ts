import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Subscription } from 'rxjs';
import { Canvas } from 'src/app/classes/canvas.class';
import { Mutex } from 'src/app/classes/mutex.class';
import { ETables } from 'src/app/models/enums/firebase-tables.enum';
import { EPixelColors } from 'src/app/models/enums/pixel-war-colors.enum';
import { IPixel } from 'src/app/models/pixel.model';
import { RealtimeFirebaseService } from 'src/app/services/firestore/realtime-firebase.service';
import { ModelFactoryService } from 'src/app/services/model-factory/model-factory.service';
import { Utils } from 'src/app/services/utils/utils.service';
import { PixelWar } from './classes/pixel-war.class';

@Component({
	selector: 'app-pixel-war',
	templateUrl: './pixel-war.component.html',
	styleUrls: ['./pixel-war.component.css'],
})
export class PixelWarComponent implements AfterViewInit, OnDestroy {
	@ViewChild('pixelWarWrapper') wrapper: ElementRef;
	private _listRef: AngularFireList<IPixel>;
	private _listChangeSubscription: Subscription;
	public app: Canvas;
	public mutex = new Mutex();
	public pixels: Array<IPixel> = [];

	constructor(private _rtfbs: RealtimeFirebaseService) {
		this._listRef = _rtfbs.getListRef(ETables.Pixels);
		this._listChangeSubscription = this._listRef.valueChanges().subscribe((pixels) => (this.pixels = pixels));
	}

	ngAfterViewInit() {
		setTimeout(() => {
			this.app = new PixelWar(this.wrapper.nativeElement);
		});
	}

	ngOnDestroy(): void {
		this._listChangeSubscription.unsubscribe();
		this.app.destroy();
	}

	private searchPixelByPos(x: number, y: number): IPixel | null {
		return this.pixels.find(({ data }) => data.posX === x && data.posY === y) || null;
	}

	create(): void {
		const posX = Utils.random(2);
		const posY = 23;
		const pixelColors = Object.entries(EPixelColors).map(([key, value]) => ({ key, value }));
		const pixelData = {
			posX,
			posY,
			color: pixelColors[Utils.random(pixelColors.length)].value,
		};
		const newPixel = ModelFactoryService.generatePixel(pixelData);
		const oldPixel = this.searchPixelByPos(posX, posY);

		// Si il existe deja un pixel sur x,y on update sinon new push
		oldPixel
			? this.mutex.exec(this._rtfbs.updateItem.bind(this._rtfbs), this._listRef, oldPixel.id, newPixel)
			: this.mutex.exec(this._rtfbs.pushNewItem.bind(this._rtfbs), this._listRef, newPixel);
	}
}
