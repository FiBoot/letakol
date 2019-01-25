import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

  @Input() inputModel: string;
  @Input() formInline: boolean;
  @Input() resetInput: boolean;
  @Input() inputClass: string;
  @Input() inputPlaceholder: string;
  @Input() submitBtnValue: string;
  @Input() submitBtnClass: string;

  @Output() formSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() keyPress: EventEmitter<string> = new EventEmitter<string>();

  public sendForm(): void {
    this.formSubmit.emit(this.inputModel);
    if (this.resetInput) { this.inputModel = ''; }
  }

  public onKey(): void {
    this.keyPress.emit(this.inputModel);
  }

}
