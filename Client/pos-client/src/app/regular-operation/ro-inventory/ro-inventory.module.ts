import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import { RoInventoryRoutingModule } from './ro-inventory-routing.module';
import {RoInventoryLayoutComponent} from './ro-inventory-layout/ro-inventory-layout.component'
import {AddItemComponent} from './add-item/add-item.component';
import { ItemPurchaseListComponent } from './item-purchase-list/item-purchase-list.component';
import { ItemPurchaseComponent } from './item-purchase/item-purchase.component'
import { FormDetailsControlComponent } from '../../common-module/form-details-control/form-details-control.component';
@NgModule({
  imports: [
    CommonModule,
    RoInventoryRoutingModule,
    CommonModuleModule
  ],
  declarations: [
    RoInventoryLayoutComponent,
    AddItemComponent, 
    ItemPurchaseListComponent, 
    ItemPurchaseComponent
  ],
  entryComponents:[ItemPurchaseComponent,FormDetailsControlComponent]
})
export class RoInventoryModule { }
