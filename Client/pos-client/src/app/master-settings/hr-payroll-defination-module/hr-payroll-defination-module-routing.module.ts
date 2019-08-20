import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HrPayrollLayoutComponent } from './hr-payroll-layout/hr-payroll-layout.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { DesignationListComponent } from './designation-list/designation-list.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { SubgradeListComponent } from './subgrade-list/subgrade-list.component';
import { SalaryItemListComponent } from './salary-item-list/salary-item-list.component';
const routes: Routes = [
  {
    path:'',
    component:HrPayrollLayoutComponent,
    children:[
      {path:'',component:LeaveTypeComponent} ,
      {path:'designation-entry',component:DesignationListComponent} ,
      {path:'empgrade-entry',component:GradeListComponent} ,
      {path:'subgrade-entry',component:SubgradeListComponent}  ,
      {path:'salaryitem-entry',component:SalaryItemListComponent}   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrPayrollDefinationModuleRoutingModule { }
