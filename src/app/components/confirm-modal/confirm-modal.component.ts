import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  @Input() title = 'Confirmation modal';
  @Input() content = '';
  @Input() alert: string;
  @Input() btnClass = 'btn-outline-danger';
  @Input() lock: boolean;

  @Output() confirm = new EventEmitter();

  constructor(private _modalService: NgbModal) { }

  public closeModal(): void {
    this._modalService.dismissAll();
  }

  public onConfirm(): void {
    this.confirm.emit();
  }

}
