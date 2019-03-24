import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule,FormControl} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MatNativeDateModule,MatDatepickerModule, MatDialogModule,MatTableModule,MatSortModule,MatPaginatorModule
} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2CompleterModule } from "ng2-completer";
import { AlertComponent } from '../alert/alert.component';
import { TestComponent } from 'src/app/test/test.component';
@NgModule({
  imports: [
    CommonModule,
   // AngularMultiSelectModule
    //Ng2CompleterModule
  ],
  declarations: [AlertComponent,TestComponent],
  exports:[ FormsModule,ReactiveFormsModule,DataTablesModule, 
    MatNativeDateModule, MatDialogModule,MatTableModule,MatSortModule,MatPaginatorModule,MatDatepickerModule,
    Ng2CompleterModule,TestComponent,
    NgbModule,
    AngularMultiSelectModule
  ],
 entryComponents:[AlertComponent]
  
})
export class SharedModule { }
