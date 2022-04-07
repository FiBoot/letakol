import { Component, Input } from '@angular/core';
import { IFireBaseItem } from 'src/app/models/firebaseItem.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.css'],
})
export class ItemComponent {
	@Input() item: IFireBaseItem;

	constructor(private _router: Router) {}

	public click(item: IFireBaseItem): void {
		this._router.navigate(['/', item.type, item.id]);
	}
}
