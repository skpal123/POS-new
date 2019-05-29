import { Component, OnInit,Inject } from '@angular/core';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { ChartOfaccount } from '../../../models/master-settings/account-defination/chart-of-account.model';
import { DialogData } from '../../../models/common/dialog-data.model';

@Component({
  selector: 'app-add-chart-of-account',
  templateUrl: './add-chart-of-account.component.html',
  styleUrls: ['./add-chart-of-account.component.css']
})
export class AddChartOfAccountComponent implements OnInit {
  constructor(private _accountService:AccountDefinationService,
    private _alertBox:AlertBoxService,
    public dialogRef:MatDialogRef<AddChartOfAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public account: ChartOfaccount
  ) {}

  ngOnInit() {
    debugger
  }
  onNoClick():void{
    this.dialogRef.close(false);
  }
  createChartOfAccount(){
    if(this.account.Id==null){
      this._accountService.CreateChartOfAccount(this.account).subscribe(response=>{
        let result=response;
        this.clearChartOfAccountForm();
        if(result){
          var dialogData=new DialogData();
          dialogData.message="Chart of account create succesfully";
          this._alertBox.openDialog(dialogData);
          this.dialogRef.close(true)
        }
      },error=>{
        var dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._accountService.UpdateChartOfAccount(this.account).subscribe(response=>{
        let result=response;
        this.clearChartOfAccountForm();
        if(result){
          var dialogData=new DialogData();
          dialogData.message="Chart of account updated succesfully";
          this._alertBox.openDialog(dialogData);
          this.dialogRef.close(true);
        }
      },error=>{
        var dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  clearChartOfAccountForm(){
    this.account.AccountDescription=null;
    this.account.AutoAccountCode=null;
    this.account.ManualAccountCode=null;
  }
}
