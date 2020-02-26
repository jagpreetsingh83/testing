import { TestBed } from '@angular/core/testing';

import { TwainService } from './twain.service';

describe('TwainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwainService = TestBed.get(TwainService);
    expect(service).toBeTruthy();
  });
});
