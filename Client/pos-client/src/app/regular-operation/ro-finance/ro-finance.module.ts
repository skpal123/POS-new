import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import { RoFinanceRoutingModule } from './ro-finance-routing.module';
import { FinanceLayoutComponent } from './finance-layout/finance-layout.component';
import { VoucherEntryComponent } from './voucher-entry/voucher-entry.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { AddVoucherDialogComponent } from './add-voucher-dialog/add-voucher-dialog.component';
import { VoucherListInsideVoucherComponent } from './voucher-list-inside-voucher/voucher-list-inside-voucher.component';
import { SubledgerTransactionComponent } from './subledger-transaction/subledger-transaction.component';

@NgModule({
  imports: [
    CommonModule,
    RoFinanceRoutingModule,
    CommonModuleModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [FinanceLayoutComponent,VoucherEntryComponent, VoucherListComponent, AddVoucherDialogComponent,
     VoucherListInsideVoucherComponent, SubledgerTransactionComponent],
  entryComponents:[AddVoucherDialogComponent,SubledgerTransactionComponent]
})
export class RoFinanceModule { }
