import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoInventoryLayoutComponent } from './ro-inventory-layout/ro-inventory-layout.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemPurchaseListComponent } from './item-purchase-list/item-purchase-list.component';

const routes: Routes = [
  {
    path:'',
    component:RoInventoryLayoutComponent,
    children:[
      {path:'',component:ItemPurchaseListComponent},
      {path:'add-item',component:ItemPurchaseListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoInventoryRoutingModule { }
