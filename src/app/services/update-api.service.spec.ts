import { TestBed } from '@angular/core/testing';

import { UpdateApiService } from './update-api.service';

describe('UpdateApiService', () => {
  let service: UpdateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
