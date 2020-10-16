import { TestBed } from '@angular/core/testing';

import { VendorAuthGuardService } from './vendor-auth-guard.service';

describe('VendorAuthGuardService', () => {
  let service: VendorAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
