import { TestBed, inject } from '@angular/core/testing';

import { FixedAssetDefinationService } from './fixed-asset-defination.service';

describe('FixedAssetDefinationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixedAssetDefinationService]
    });
  });

  it('should be created', inject([FixedAssetDefinationService], (service: FixedAssetDefinationService) => {
    expect(service).toBeTruthy();
  }));
});
