import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyItem } from 'src/app/types';
import { CurrencyConverterService } from '../../services/currency-converter.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.css'],
})
export class CurrencyRateComponent implements OnInit, OnDestroy {
  currencyArray: CurrencyItem[] = [];

  subscription$ = new Subscription();
  constructor(private currencyService: CurrencyConverterService) {}

  ngOnInit() {
    this.subscription$.add(
      this.currencyService.currencyDataChanged$.subscribe((el) => {
        this.currencyArray = el.slice(0, 2);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
