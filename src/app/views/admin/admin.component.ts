import { Component, ElementRef, ViewChild } from '@angular/core';
import { IFireBaseItem } from 'src/app/models/firebaseItem.model';
import { Mutex } from 'src/app/classes/mutex.class';
import { ViewComponent } from '../view.component';
import { UserService } from 'src/app/services/user/user.service';
import { FireStoreService } from 'src/app/services/firestore/firestore.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

enum ESortTypes {
	Uid,
	Name,
	Type,
	CreationDate,
	LastUpdate,
}

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent extends ViewComponent {
	private _deleteConfirmModal: NgbModalRef | undefined;

	public items: Array<IFireBaseItem>;
	public displayedItems: Array<IFireBaseItem>;
	public mutex = new Mutex();
	public sortTypes = ESortTypes;
	public sortBy: ESortTypes | null = ESortTypes.LastUpdate;
	public ascOrder = false;

	constructor(
		userService: UserService,
		private _firestore: FireStoreService,
		private _router: Router,
		private _modalService: NgbModal
	) {
		super(userService);
		if (!this._currentUser || !this._currentUser.admin) {
			this._router.navigate(['/']);
		}
		this.fetchData();
	}

	public fetchData(): void {
		this._firestore.getList<IFireBaseItem>(this._firestore.TABLE).then((items) => {
			this.items = items;
			this.sort(this.sortBy, true);
		});
	}

	public sort(by: ESortTypes | null, force: boolean = false): void {
		const items = this.items.slice();
		if (!force) {
			by === this.sortBy ? (this.ascOrder = !this.ascOrder) : (this.sortBy = by);
		}
		switch (by) {
			case ESortTypes.Uid:
				// items.sort((a, b) => (a.type === EItemTypes.User ? a.id.localeCompare(b.id) : a.uid.localeCompare(b.uid)));
				items.sort((a, b) => (this.ascOrder ? a.uid.localeCompare(b.uid) : b.uid.localeCompare(a.uid)));
				break;
			case ESortTypes.Name:
				items.sort((a, b) => (this.ascOrder ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
				break;
			case ESortTypes.Type:
				items.sort((a, b) => (this.ascOrder ? a.type.localeCompare(b.type) : b.type.localeCompare(a.type)));
				break;
			case ESortTypes.CreationDate:
				items.sort((a, b) => (this.ascOrder ? b.creationDate - a.creationDate : a.creationDate - b.creationDate));
				break;
			case ESortTypes.LastUpdate:
				items.sort((a, b) => (this.ascOrder ? b.lastUpdateDate - a.lastUpdateDate : a.creationDate - b.creationDate));
				break;
			default:
				this.sort = null;
		}
		this.items = items;
	}

	public goTo(item: IFireBaseItem): void {
		this._router.navigate(['/', item.type, item.id]);
	}

	public delete(item: IFireBaseItem): void {
		this._deleteConfirmModal = this._modalService.open(ConfirmModalComponent);
		this._deleteConfirmModal.componentInstance.content = `Are you sure you want to delete this ${item.type} ?`;
		this._deleteConfirmModal.componentInstance.lock = false;
		this._deleteConfirmModal.componentInstance.confirm.subscribe(() => this.confirmDelete(item));
		console.log(this._deleteConfirmModal.componentInstance);
	}

	private confirmDelete(item: IFireBaseItem): void {
		this._deleteConfirmModal.componentInstance.lock = true;
		this._firestore.delete(item).then(() => {
			this._deleteConfirmModal.componentInstance.lock = false;
			this.fetchData();
			this._deleteConfirmModal.close();
		});
	}
}
