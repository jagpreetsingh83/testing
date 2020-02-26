import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwainService {
  constructor() {}

  getQuote() {
    return of('my next quote').pipe(delay(2000));
  }
}
