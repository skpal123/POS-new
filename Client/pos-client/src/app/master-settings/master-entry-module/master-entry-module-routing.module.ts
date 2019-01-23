import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterEntryLayoutComponent } from './master-entry-layout/master-entry-layout.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EducationLevelComponent } from './education-level/education-level.component';

const routes: Routes = [
  {
    path:'',
    component:MasterEntryLayoutComponent,
    children:[
      {path:'',component:DepartmentComponent},
      {path:'department',component:DepartmentComponent},
      {path:'desigantion',component:DesignationComponent},
      {path:'education-level',component:EducationLevelComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterEntryModuleRoutingModule { }
