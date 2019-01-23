import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoInventoryLayoutComponent } from './ro-inventory-layout/ro-inventory-layout.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  {
    path:'',
    component:RoInventoryLayoutComponent,
    children:[
      {path:'',component:AddItemComponent},
      {path:'add-item',component:AddItemComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoInventoryRoutingModule { }
