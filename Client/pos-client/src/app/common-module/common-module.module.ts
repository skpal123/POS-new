import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared/shared.module';
import { DynamicTableEntryComponent } from './dynamic-table-entry/dynamic-table-entry.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component'
@NgModule({
  imports: [
    CommonModule,
    SharedModule  
  ],
  declarations: [ DynamicTableEntryComponent, DynamicFormBuilderComponent],
  exports:[DynamicTableEntryComponent,SharedModule,DynamicFormBuilderComponent]
})
export class CommonModuleModule { }
