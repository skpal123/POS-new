import { TestBed, inject } from '@angular/core/testing';

import { InventoryDefinationServiceService } from './inventory-defination-service.service';

describe('InventoryDefinationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryDefinationServiceService]
    });
  });

  it('should be created', inject([InventoryDefinationServiceService], (service: InventoryDefinationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
