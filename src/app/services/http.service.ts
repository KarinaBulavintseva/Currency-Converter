import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CurrencyItem } from '../types';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  url: string = 'https://api.monobank.ua/bank/currency';
  constructor(private http: HttpClient) {}

  getData(): Observable<CurrencyItem[]> {
    return this.http.get<CurrencyItem[]>(this.url).pipe(
      map((responseData: CurrencyItem[]) => {
        return responseData;
      }),
      catchError((error) => {
        return throwError(
          () => new Error('Something went wrong, please try again later.')
        );
      })
    );
  }
}
