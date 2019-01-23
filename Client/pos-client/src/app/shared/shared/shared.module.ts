import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule,FormControl} from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatNativeDateModule, MatDialogModule,MatTableModule,MatSortModule,MatPaginatorModule
} from '@angular/material';
import { Ng2CompleterModule } from "ng2-completer";
import { AlertComponent } from '../alert/alert.component';
import { TestComponent } from 'src/app/test/test.component';

@NgModule({
  imports: [
    CommonModule,
    //Ng2CompleterModule
  ],
  declarations: [AlertComponent,TestComponent],
  exports:[ FormsModule,ReactiveFormsModule,DataTablesModule, 
    MatNativeDateModule, MatDialogModule,MatTableModule,MatSortModule,MatPaginatorModule,
    Ng2CompleterModule,TestComponent
  ],
 entryComponents:[AlertComponent]
  
})
export class SharedModule { }
