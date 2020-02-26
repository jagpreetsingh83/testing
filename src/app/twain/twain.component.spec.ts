import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { cold, getTestScheduler } from 'jasmine-marbles';

import { TwainComponent } from './twain.component';

describe('TwainComponent', () => {
  let component: TwainComponent;
  let fixture: ComponentFixture<TwainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwainComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the quote after 2000ms (async - actual 2s wait!!)', async(() => {
    const quoteEl = fixture.debugElement.query(By.css('.twain'))
      .nativeElement as HTMLElement;
    component.getQuote();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('...', 'default placeholder value');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(quoteEl.textContent).toBe('my next quote', 'mark twain quote');
    });
  }));

  it('should display the quote after 2000ms (async - await)', async(async () => {
    const quoteEl = fixture.debugElement.query(By.css('.twain'))
      .nativeElement as HTMLElement;
    component.getQuote();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('...', 'default placeholder value');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('my next quote', 'mark twain quote');
  }));

  it('should display the quote after 2000ms (fakeAsync - No wait!!)', fakeAsync(() => {
    const quoteEl = fixture.debugElement.query(By.css('.twain'))
      .nativeElement as HTMLElement;
    component.getQuote();
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('...', 'default placeholder value');
    tick(2000);
    fixture.detectChanges();
    expect(quoteEl.textContent).toBe('my next quote', 'mark twain quote');
  }));

  it('Marble Testing', () => {
    const quoteEl = fixture.debugElement.query(By.css('.twain'))
      .nativeElement as HTMLElement;

    component.quote = cold('---a|', { a: 'marble quote' });

    fixture.detectChanges();

    getTestScheduler().flush();

    fixture.detectChanges();

    expect(quoteEl.textContent).toBe('marble quote', 'mark twain quote');
  });
});
