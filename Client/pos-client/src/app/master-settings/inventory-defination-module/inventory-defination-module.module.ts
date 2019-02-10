import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryDefinationModuleRoutingModule } from './inventory-defination-module-routing.module';
import { InventoryLayoutComponent } from './inventory-layout/inventory-layout.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { AddUnitComponent } from './add-unit/add-unit.component';

@NgModule({
  imports: [
    CommonModule,
    InventoryDefinationModuleRoutingModule
  ],
  declarations: [InventoryLayoutComponent, CategoryComponent, AddCategoryComponent, AddSubcategoryComponent, AddUnitComponent]
})
export class InventoryDefinationModuleModule { }
