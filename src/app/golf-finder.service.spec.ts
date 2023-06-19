import { TestBed } from '@angular/core/testing';

import { GolfFinderService } from './golf-finder.service';

describe('GolfFinderService', () => {
  let service: GolfFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GolfFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
