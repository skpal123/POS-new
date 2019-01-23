import { TestBed, inject } from '@angular/core/testing';

import { HrPayrollDefinationServiceService } from './hr-payroll-defination-service.service';

describe('HrPayrollDefinationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrPayrollDefinationServiceService]
    });
  });

  it('should be created', inject([HrPayrollDefinationServiceService], (service: HrPayrollDefinationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
