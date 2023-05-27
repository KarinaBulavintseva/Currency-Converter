import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../app/services/http.service';
import { Subscription } from 'rxjs';
import { CurrencyConverterService } from '../app/services/currency-converter.service';
import { CurrencyItem } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  errorMessage = '';

  subscription$ = new Subscription();

  constructor(
    private httpService: DataStorageService,
    private currencyConverterService: CurrencyConverterService
  ) {}

  ngOnInit() {
    this.subscription$.add(
      this.httpService.getData().subscribe({
        next: (data: CurrencyItem[]) => {
          this.currencyConverterService.transformData(data);
        },
        error: (error) => {
          this.errorMessage = error;
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
