import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';

import { TwainService } from '../services/twain.service';

@Component({
  selector: 'app-twain',
  templateUrl: './twain.component.html',
  styleUrls: ['./twain.component.scss']
})
export class TwainComponent implements OnInit {
  errorMessage: string;
  quote: Observable<string>;

  constructor(private twainService: TwainService) {}

  ngOnInit() {}

  getQuote() {
    this.errorMessage = '';
    this.quote = this.twainService.getQuote().pipe(
      startWith('...'),
      catchError((err: any) => {
        this.errorMessage = err.message || err.toString();
        return of('-- Not Available --');
      })
    );
  }
}
