import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrPayrollLayoutComponent } from './hr-payroll-layout/hr-payroll-layout.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
const routes: Routes = [
  {
    path:'',
    component:HrPayrollLayoutComponent,
    children:[
      {path:'',component:LeaveTypeComponent}  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrPayrollDefinationModuleRoutingModule { }
