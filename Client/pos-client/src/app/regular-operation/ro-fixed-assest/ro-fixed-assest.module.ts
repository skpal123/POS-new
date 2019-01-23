import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoFixedAssestRoutingModule } from './ro-fixed-assest-routing.module';
import { RoFixedAssetLayoutComponent } from './ro-fixed-asset-layout/ro-fixed-asset-layout.component';
import { FixedAssetEntryComponent } from './fixed-asset-entry/fixed-asset-entry.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { SaleDisposaleComponent } from './sale-disposale/sale-disposale.component';
import { AssetAdjustmentComponent } from './asset-adjustment/asset-adjustment.component';

@NgModule({
  imports: [
    CommonModule,
    RoFixedAssestRoutingModule
  ],
  declarations: [RoFixedAssetLayoutComponent, FixedAssetEntryComponent, AssetListComponent, SaleDisposaleComponent, AssetAdjustmentComponent]
})
export class RoFixedAssestModule { }
