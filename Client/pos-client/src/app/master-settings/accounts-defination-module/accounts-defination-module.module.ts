import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsDefinationModuleRoutingModule } from './accounts-defination-module-routing.module';
import { AcountLayoutComponent } from './acount-layout/acount-layout.component';

@NgModule({
  imports: [
    CommonModule,
    AccountsDefinationModuleRoutingModule
  ],
  declarations: [AcountLayoutComponent]
})
export class AccountsDefinationModuleModule { }
