import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryDefinationModuleRoutingModule } from './inventory-defination-module-routing.module';
import { InventoryLayoutComponent } from './inventory-layout/inventory-layout.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { ItemCategoryListComponent } from './item-category-list/item-category-list.component';
import { ItemSubcategoryListComponent } from './item-subcategory-list/item-subcategory-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { InventoryLocationListComponent } from './inventory-location-list/inventory-location-list.component';
import { ItemEntryComponent } from './item-entry/item-entry.component';
import { LocationEntryComponent } from './location-entry/location-entry.component';

@NgModule({
  imports: [
    CommonModule,
    InventoryDefinationModuleRoutingModule
  ],
  declarations: [InventoryLayoutComponent, CategoryComponent, AddCategoryComponent, AddSubcategoryComponent, AddUnitComponent, UnitListComponent, ItemCategoryListComponent, ItemSubcategoryListComponent, ItemListComponent, InventoryLocationListComponent, ItemEntryComponent, LocationEntryComponent]
})
export class InventoryDefinationModuleModule { }
