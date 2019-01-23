import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoInventoryRoutingModule } from './ro-inventory-routing.module';
import {RoInventoryLayoutComponent} from './ro-inventory-layout/ro-inventory-layout.component'
import {AddItemComponent} from './add-item/add-item.component'
@NgModule({
  imports: [
    CommonModule,
    RoInventoryRoutingModule
  ],
  declarations: [RoInventoryLayoutComponent,AddItemComponent]
})
export class RoInventoryModule { }
