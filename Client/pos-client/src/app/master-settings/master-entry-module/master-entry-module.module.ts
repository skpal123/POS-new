import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterEntryModuleRoutingModule } from './master-entry-module-routing.module';
import { DesignationComponent } from './designation/designation.component';
import { DepartmentComponent } from './department/department.component';
import { EducationLevelComponent } from './education-level/education-level.component';
import { MasterEntryLayoutComponent } from './master-entry-layout/master-entry-layout.component';

@NgModule({
  imports: [
    CommonModule,
    MasterEntryModuleRoutingModule
  ],
  declarations: [DesignationComponent, DepartmentComponent, EducationLevelComponent, MasterEntryLayoutComponent]
})
export class MasterEntryModule { }
