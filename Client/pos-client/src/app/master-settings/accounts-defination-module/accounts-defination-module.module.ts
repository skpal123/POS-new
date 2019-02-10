import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonModuleModule} from 'src/app/common-module/common-module.module'
import { TreeModule } from 'angular-tree-component';
import { AccountsDefinationModuleRoutingModule } from './accounts-defination-module-routing.module';
import { AcountLayoutComponent } from './acount-layout/acount-layout.component';
import { ChartOfAccountComponent } from './chart-of-account/chart-of-account.component';
import { AccountOpeningComponent } from './account-opening/account-opening.component';
import { CoaTreeComponent } from './coa-tree/coa-tree.component';

@NgModule({
  imports: [
    CommonModule,
    AccountsDefinationModuleRoutingModule,
    CommonModuleModule,
    TreeModule.forRoot()
  ],
  declarations: [AcountLayoutComponent, ChartOfAccountComponent, AccountOpeningComponent, CoaTreeComponent]
})
export class AccountsDefinationModuleModule { }
