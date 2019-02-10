import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryLayoutComponent } from './inventory-layout/inventory-layout.component';
import { CategoryComponent } from './category/category.component';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  {
    path:'',
    component:InventoryLayoutComponent,
    children:[
      {path:'',component:AddCategoryComponent},
      {path:'add-category',component:AddCategoryComponent},
      {path:'add-subCategory',component:AddSubcategoryComponent},
      {path:'add-unit',component:AddUnitComponent}
    ]
  },{
    path:'inventory-defination',
    component:InventoryLayoutComponent,
    children:[
      {path:'',component:AddCategoryComponent},
      {path:'add-category',component:AddCategoryComponent},
      {path:'add-subCategory',component:AddSubcategoryComponent},
      {path:'add-unit',component:AddUnitComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryDefinationModuleRoutingModule { }
