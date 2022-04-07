import { Component } from '@angular/core';
import { Debouncer } from 'src/app/classes/debouncer.class';
import { EItemTypes } from 'src/app/models/enums/firebase-item-types.enum';
import { EPixelColors } from 'src/app/models/enums/pixel-war-colors.enum';
import { IFireBaseItem } from 'src/app/models/firebaseItem.model';
import { IPixel } from 'src/app/models/pixel.model';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';

@Component({
	selector: 'app-default',
	templateUrl: './default.component.html',
	styleUrls: ['./default.component.css'],
})
export class DefaultComponent {
	public items: Array<IFireBaseItem>;
	public displayedItems: Array<IFireBaseItem>;
	public searchDebouncer: Debouncer;

	constructor(private _firestore: FireStoreService) {
		this.searchDebouncer = new Debouncer(this.search.bind(this), 100);
		this._firestore.getList<IFireBaseItem>(this._firestore.TABLE, 'lastUpdateDate', 8).then((result) => {
			this.items = result;
			this.displayedItems = this.items;
		});
	}

	public search(string: string): void {
		this.displayedItems = this.items.filter((item) => item.name.includes(string) || item.type.includes(string));
	}
}
