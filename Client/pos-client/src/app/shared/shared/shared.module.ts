import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule,FormControl} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling'; 
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2CompleterModule } from "ng2-completer";
import { AlertComponent } from '../alert/alert.component';
import { TestComponent } from 'src/app/test/test.component';
import {SelectListRequiredValidator} from '../directive/select-list-required-validator.directive'
import {DuplicateCheckDirective} from '../directive/duplicate-check.directive'
import {CategoryExistingCheckAsyncValidator} from '../directive/categoryid-duplicaion-check.directive'
import {SubcategoryExistingCheckAsyncValidator} from '../directive/subcategory-duplication-check.directive'
import {ItemExistingCheckAsyncValidator} from '../directive/itemId-duplication-check.directive'
import {SupplierExistingCheckAsyncValidator} from '../directive/supplierid-duplication.directive'
import {CustomerExistingCheckAsyncValidator} from '../directive/customerid-duplication-check.directive'
@NgModule({
  imports: [
    CommonModule,
   // AngularMultiSelectModule
    //Ng2CompleterModule
  ],
  declarations: [AlertComponent,TestComponent,SelectListRequiredValidator,
    DuplicateCheckDirective,
    CategoryExistingCheckAsyncValidator,SubcategoryExistingCheckAsyncValidator,
    ItemExistingCheckAsyncValidator,SupplierExistingCheckAsyncValidator,
    CustomerExistingCheckAsyncValidator
  ],
  exports:[ FormsModule,ReactiveFormsModule,DataTablesModule, 
    A11yModule,CdkStepperModule,CdkTableModule,CdkTreeModule,DragDropModule,MatAutocompleteModule,
    MatBadgeModule,MatBottomSheetModule,MatButtonModule,MatButtonToggleModule,MatCardModule,MatCheckboxModule,
    MatChipsModule,MatStepperModule,MatDatepickerModule, MatDialogModule,MatDividerModule,
    MatExpansionModule,MatGridListModule,MatIconModule,MatInputModule,MatListModule,MatMenuModule,
    MatNativeDateModule,MatPaginatorModule,MatProgressBarModule,MatProgressSpinnerModule,
    MatRadioModule,MatRippleModule,MatSelectModule,MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule,MatSortModule,
    MatTableModule,MatTabsModule,MatToolbarModule,MatTooltipModule,MatTreeModule,PortalModule,
    ScrollingModule,
    Ng2CompleterModule,TestComponent,
    NgbModule,
    AngularMultiSelectModule,
    SelectListRequiredValidator,DuplicateCheckDirective, 
    CategoryExistingCheckAsyncValidator,SubcategoryExistingCheckAsyncValidator,
    SupplierExistingCheckAsyncValidator,ItemExistingCheckAsyncValidator,
    CustomerExistingCheckAsyncValidator
  ],
 entryComponents:[AlertComponent]
  
})
export class SharedModule { }
