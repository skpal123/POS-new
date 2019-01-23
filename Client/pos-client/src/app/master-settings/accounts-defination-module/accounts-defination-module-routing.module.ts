import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcountLayoutComponent } from './acount-layout/acount-layout.component';

const routes: Routes = [
  {
    path:'',
    component:AcountLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule]
})
export class AccountsDefinationModuleRoutingModule { }
