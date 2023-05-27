import { Component } from '@angular/core';
import { CurrencyConverterService } from '../../services/currency-converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent {
  leftInput = 0;
  rightInput = 0;

  leftSelect = 'USD';
  rightSelect = 'UAH';

  constructor(private currencyConverterService: CurrencyConverterService) {}

  handleLeftSelectEvent(event: Event) {
    this.leftSelect = this.getValue(event);
    this.setRightInputValue();
  }

  handleRightSelectEvent(event: Event) {
    this.rightSelect = this.getValue(event);
    this.setLeftInputValue();
  }

  handleRightInputEvent(event: Event) {
    this.rightInput = +this.getValue(event);
    this.setLeftInputValue();
  }

  handleLeftInputEvent(event: Event) {
    this.leftInput = +this.getValue(event);
    this.setRightInputValue();
  }

  setLeftInputValue() {
    this.leftInput = this.currencyConverterService.convertCurrency(
      this.rightInput,
      this.rightSelect,
      this.leftSelect
    );
  }

  setRightInputValue() {
    this.rightInput = this.currencyConverterService.convertCurrency(
      this.leftInput,
      this.leftSelect,
      this.rightSelect
    );
  }

  getValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }
}
