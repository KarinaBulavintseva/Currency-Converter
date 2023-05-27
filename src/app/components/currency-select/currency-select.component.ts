import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyCode } from 'src/app/types';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.css'],
})
export class CurrencySelectComponent {
  @Input() selectedValue!: string;
  @Output() optionChanged = new EventEmitter<Event>();
  currency: CurrencyCode[] = [
    { name: 'USD' },
    { name: 'EUR' },
    { name: 'UAH' },
  ];
  constructor() {}

  onChangeOption(event: Event) {
    this.optionChanged.emit(event);
  }
}
