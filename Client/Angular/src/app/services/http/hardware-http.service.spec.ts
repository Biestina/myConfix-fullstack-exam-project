import { TestBed } from '@angular/core/testing';

import { HardwareHttpService } from './hardware-http.service';

describe('HardwareHttpService', () => {
  let service: HardwareHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
