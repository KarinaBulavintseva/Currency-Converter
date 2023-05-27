import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CurrencyItem } from '../types';
import { currencyCodes } from '../constants';
import { code, number } from 'currency-codes';
import { CurrencyRate } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterService {
  currencyDataChanged$ = new Subject<CurrencyItem[]>();
  currencyCodes: number[];
  currencyRate: CurrencyRate = {};

  constructor() {
    this.currencyCodes = this.getCodes(currencyCodes);
  }

  transformData(data: CurrencyItem[]): void {
    const transformedData = data
      .filter((el: CurrencyItem) =>
        this.currencyCodes.includes(Number(el.currencyCodeA))
      )
      .map((el: CurrencyItem) => ({
        ...el,
        currencyCodeA: number(String(el.currencyCodeA))?.code as string,
        currencyCodeB: number(String(el.currencyCodeB))?.code as string,
      }));

    for (const el of transformedData) {
      if (!this.currencyRate.hasOwnProperty(el.currencyCodeA)) {
        this.currencyRate[el.currencyCodeA] = {};
      }
      this.currencyRate[el.currencyCodeA][el.currencyCodeB] = Number(
        el.rateBuy
      );
    }

    const usdToEurRate = this.currencyRate['USD']?.['EUR'];
    const eurToUsdRate = this.currencyRate['EUR']?.['USD'];
    if (typeof usdToEurRate === 'number' && typeof eurToUsdRate === 'number') {
      this.currencyRate['USD']['EUR'] = 1 / eurToUsdRate;
      this.currencyRate['EUR']['USD'] = 1 / usdToEurRate;
    }
    this.currencyDataChanged$.next(transformedData);
  }

  getCodes(array: string[]) {
    return array.map((el) => +code(el)!.number);
  }

  convertCurrency(
    amount: number,
    currencyFrom: string,
    currencyTo: string
  ): number {
    if (currencyFrom === currencyTo) {
      return amount;
    }

    const rateAtoB = this.currencyRate[currencyFrom]?.[currencyTo];
    const rateBtoA = this.currencyRate[currencyTo]?.[currencyFrom];

    if (typeof rateAtoB === 'number') {
      return Number((amount * rateAtoB).toFixed(2));
    } else if (typeof rateBtoA === 'number') {
      return Number((amount / rateBtoA).toFixed(2));
    }

    return 0;
  }
}
