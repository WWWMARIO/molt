import { TestBed } from '@angular/core/testing';

import { ApiMessagesService } from './api-messages.service';

describe('ApiMessagesService', () => {
  let service: ApiMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
