import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared/shared.module';
import { DynamicTableEntryComponent } from './dynamic-table-entry/dynamic-table-entry.component';
import { DynamicFormBuilderComponent } from './dynamic-form-builder/dynamic-form-builder.component';
import { CustomDatatableComponent } from './custom-datatable/custom-datatable.component';
import { CategoryDropdownComponent } from './category-dropdown/category-dropdown.component';
import { SubcategoryDropdownComponent } from './subcategory-dropdown/subcategory-dropdown.component';
import { ItemDropdownComponent } from './item-dropdown/item-dropdown.component';
import { UnitDropdownComponent } from './unit-dropdown/unit-dropdown.component';
import { LedgerDropdownComponent } from './ledger-dropdown/ledger-dropdown.component';
import { SubledgerDropdownComponent } from './subledger-dropdown/subledger-dropdown.component';
import { FormValidationInfoComponent } from './form-validation-info/form-validation-info.component';
import { FormDetailsControlComponent } from './form-details-control/form-details-control.component'
@NgModule({
  imports: [
    CommonModule,
    SharedModule  
  ],
  declarations: [
     DynamicTableEntryComponent, 
    DynamicFormBuilderComponent, 
    CustomDatatableComponent, 
    CategoryDropdownComponent, 
    SubcategoryDropdownComponent, 
    ItemDropdownComponent, 
    UnitDropdownComponent, 
    LedgerDropdownComponent, 
    SubledgerDropdownComponent, FormValidationInfoComponent, FormDetailsControlComponent
  ],
  exports:[
    DynamicTableEntryComponent,
    SharedModule,
    DynamicFormBuilderComponent,
    CustomDatatableComponent,
    CategoryDropdownComponent, 
    SubcategoryDropdownComponent, 
    ItemDropdownComponent,
    UnitDropdownComponent, 
    LedgerDropdownComponent, 
    SubledgerDropdownComponent,
    FormDetailsControlComponent
  ]
})
export class CommonModuleModule { }
