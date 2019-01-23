import { TestBed, inject } from '@angular/core/testing';

import { AccountDefinationService } from './account-defination.service';

describe('AccountDefinationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountDefinationService]
    });
  });

  it('should be created', inject([AccountDefinationService], (service: AccountDefinationService) => {
    expect(service).toBeTruthy();
  }));
});
