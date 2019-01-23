import { TestBed, inject } from '@angular/core/testing';

import { HrPayrollService } from './hr-payroll.service';

describe('HrPayrollService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrPayrollService]
    });
  });

  it('should be created', inject([HrPayrollService], (service: HrPayrollService) => {
    expect(service).toBeTruthy();
  }));
});
