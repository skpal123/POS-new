import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrPayrollDefinationModuleRoutingModule } from './hr-payroll-defination-module-routing.module';
import { HrPayrollLayoutComponent } from './hr-payroll-layout/hr-payroll-layout.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';

@NgModule({
  imports: [
    CommonModule,
    HrPayrollDefinationModuleRoutingModule
  ],
  declarations: [HrPayrollLayoutComponent, LeaveTypeComponent]
})
export class HrPayrollDefinationModuleModule { }
