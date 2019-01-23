import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanceLayoutComponent } from './finance-layout/finance-layout.component';
import { VoucherEntryComponent } from './voucher-entry/voucher-entry.component';
import { VoucherListComponent } from './voucher-list/voucher-list.component';

const routes: Routes = [
  {
    path:'',
    component:FinanceLayoutComponent,
    children:[
      {path:'',component:VoucherEntryComponent},
      {path:'voucher',component:VoucherEntryComponent},
      {path:'voucher-list',component:VoucherListComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoFinanceRoutingModule { }
