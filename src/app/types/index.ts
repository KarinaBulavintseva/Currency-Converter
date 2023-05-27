export interface CurrencyItem {
  currencyCodeA: number | string;
  currencyCodeB: number | string;
  date: number;
  rateSell: number;
  rateBuy: number | string;
  rateCross: number;
}

export interface CurrencyRate {
  [currencyFrom: string]: {
    [currencyTo: string]: number | string;
  };
}

export interface CurrencyCode {
  name: string;
}
