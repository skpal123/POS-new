import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared/shared.module';
import { DynamicTableEntryComponent } from './dynamic-table-entry/dynamic-table-entry.component'
@NgModule({
  imports: [
    CommonModule,
    SharedModule  
  ],
  declarations: [ DynamicTableEntryComponent],
  exports:[DynamicTableEntryComponent,SharedModule]
})
export class CommonModuleModule { }
