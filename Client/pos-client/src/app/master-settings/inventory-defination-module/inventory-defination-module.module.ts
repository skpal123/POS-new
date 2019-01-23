import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryDefinationModuleRoutingModule } from './inventory-defination-module-routing.module';
import { InventoryLayoutComponent } from './inventory-layout/inventory-layout.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  imports: [
    CommonModule,
    InventoryDefinationModuleRoutingModule
  ],
  declarations: [InventoryLayoutComponent, CategoryComponent]
})
export class InventoryDefinationModuleModule { }
