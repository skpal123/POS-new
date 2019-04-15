import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import {InventoryDefinationModuleModule} from 'src/app/master-settings/inventory-defination-module/inventory-defination-module.module'
import { RoInventoryRoutingModule } from './ro-inventory-routing.module';
import {RoInventoryLayoutComponent} from './ro-inventory-layout/ro-inventory-layout.component'
import {AddItemComponent} from './add-item/add-item.component';
import { ItemPurchaseListComponent } from './item-purchase-list/item-purchase-list.component';
import { ItemPurchaseComponent } from './item-purchase/item-purchase.component'
import { FormDetailsControlComponent } from '../../common-module/form-details-control/form-details-control.component';
import { SupplierEntryComponent } from '../../master-settings/inventory-defination-module/supplier-entry/supplier-entry.component';
import { ItemSalesComponent } from './item-sales/item-sales.component';
import { ItemSalesListComponent } from './item-sales-list/item-sales-list.component';
import { CustomerEntryComponent } from '../../master-settings/inventory-defination-module/customer-entry/customer-entry.component';
import { PartyEntryComponent } from '../../master-settings/inventory-defination-module/party-entry/party-entry.component';
@NgModule({
  imports: [
    CommonModule,
    RoInventoryRoutingModule,
    CommonModuleModule,
    InventoryDefinationModuleModule
  ],
  declarations: [
    RoInventoryLayoutComponent,
    AddItemComponent, 
    ItemPurchaseListComponent, 
    ItemPurchaseComponent, ItemSalesComponent, ItemSalesListComponent
  ],
  entryComponents:[ItemPurchaseComponent,
    FormDetailsControlComponent,
    SupplierEntryComponent,
    CustomerEntryComponent,
    PartyEntryComponent,
    ItemSalesComponent
  ]
})
export class RoInventoryModule { }
