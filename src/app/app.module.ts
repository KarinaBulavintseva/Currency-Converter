import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { CurrencyRateComponent } from './components/currency-rate/currency-rate.component';
import { ConverterComponent } from './components/converter/converter.component';

import { CurrencySelectComponent } from './components/currency-select/currency-select.component';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyRateComponent,
    ConverterComponent,
    CurrencySelectComponent,
    CurrencyInputComponent,
  ],
  imports: [BrowserModule, HttpClientModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
