import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOfAccountTree } from '../../../models/master-settings/account-defination/chart-of-account-tree.model';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FixedAssetDefinationService } from '../../../services/master-settings/fixed-asset-defination.service';
@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css']
})
export class ChartOfAccountComponent implements OnInit {
  chartOfAccountTree:ChartOfAccountTree[]=[];
  constructor(private _accountDeninationService:AccountDefinationService,
    private _service:FixedAssetDefinationService,
  private _alertBoxService:AlertBoxService){}
  ngOnInit(){
    debugger
    this.getChartOfaccountTreeList();
  }
  getChartOfaccountTreeList(){
    this._service.getChartOfAccountListForTree().subscribe(response=>{
      this.chartOfAccountTree=response.json();
    },error=>{
      var dialogData=new DialogData();
      dialogData.message=error.json().message;
      this._alertBoxService.openDialog(dialogData);
    })
  }
}

