import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-mutex-button',
	templateUrl: './mutex-button.component.html',
	styleUrls: ['./mutex-button.component.css'],
})
export class MutexButtonComponent {
	@Input() lock: boolean;
	@Input() btnClass: string;
	@Input() btnValue: string;

	@Output() clicked = new EventEmitter();

	public onClick(): void {
		this.clicked.emit();
	}
}
