import { TestBed } from '@angular/core/testing';

import { GpsProService } from './gps-pro.service';

describe('GpsProService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpsProService = TestBed.get(GpsProService);
    expect(service).toBeTruthy();
  });
});
