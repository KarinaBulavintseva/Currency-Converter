import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css'],
})
export class CurrencyInputComponent {
  @Input() enteredNumbers!: number;
  @Output() inputValueChanged = new EventEmitter<Event>();

  onChangeNumber(event: Event) {
    this.inputValueChanged.emit(event);
  }
}
