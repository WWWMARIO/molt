import { TestBed } from '@angular/core/testing';

import { ApiMenuServiceService } from './api-menu-service.service';

describe('ApiMenuServiceService', () => {
  let service: ApiMenuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMenuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
