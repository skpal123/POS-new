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
import { FormDetailsControlComponent } from './form-details-control/form-details-control.component';
import { SupplierDropdownComponent } from './supplier-dropdown/supplier-dropdown.component';
import { CustomerDropdownComponent } from './customer-dropdown/customer-dropdown.component';
import { PartyDropdownComponent } from './party-dropdown/party-dropdown.component';
import { CustomDatatableControlComponent } from './custom-datatable-control/custom-datatable-control.component';
import { AutocodeGenerateComponent } from './autocode-generate/autocode-generate.component';
import { CustomDatatableControlSettingsComponent } from './custom-datatable-control-settings/custom-datatable-control-settings.component';
import { FormControlInfoSettingsComponent } from './form-control-info-settings/form-control-info-settings.component';
import { CustomMultiSelectComponent } from './custom-multi-select/custom-multi-select.component';
import { CustomSerachableDropdownComponent } from './custom-serachable-dropdown/custom-serachable-dropdown.component';
import { DesignationDropdownComponent } from './designation-dropdown/designation-dropdown.component';
import { GradeDropdownComponent } from './grade-dropdown/grade-dropdown.component'
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
    SubledgerDropdownComponent, 
    FormValidationInfoComponent, 
    FormDetailsControlComponent, 
    SupplierDropdownComponent, 
    CustomerDropdownComponent, 
    PartyDropdownComponent, 
    CustomDatatableControlComponent, 
    AutocodeGenerateComponent,
    CustomDatatableControlSettingsComponent,
    FormControlInfoSettingsComponent,
    CustomMultiSelectComponent,
    CustomSerachableDropdownComponent,
    DesignationDropdownComponent,
    GradeDropdownComponent
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
    FormDetailsControlComponent,
    SupplierDropdownComponent,
    PartyDropdownComponent,
    CustomerDropdownComponent,
    CustomDatatableControlComponent, 
    AutocodeGenerateComponent,
    CustomDatatableControlSettingsComponent,
    FormControlInfoSettingsComponent,
    CustomMultiSelectComponent,
    DesignationDropdownComponent,
    GradeDropdownComponent
  ]
})
export class CommonModuleModule { }
