import { TestBed } from '@angular/core/testing';

import { GolfDetailsService } from './golf-details.service';

describe('GolfDetailsService', () => {
  let service: GolfDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GolfDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
