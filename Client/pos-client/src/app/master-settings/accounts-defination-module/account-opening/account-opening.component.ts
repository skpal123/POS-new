import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChartOfaccount } from '../../../models/master-settings/account-defination/chart-of-account.model';
import { AccountsService } from '../../../services/regular-operation/accounts.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { AccountOpeningView } from '../../../models/master-settings/account-defination/account-opening-view.model';

@Component({
  selector: 'app-account-opening',
  templateUrl: './account-opening.component.html',
  styleUrls: ['./account-opening.component.css']
})
export class AccountOpeningComponent implements OnInit {
  @ViewChild('openingDateControl') openingDateControl:FormControl;
  @ViewChild('searchAccountCodeControl') searchAccountCodeControl:FormControl;
  openingDate:string;
  searchAccountCode:string;
  accountList:ChartOfaccount[]=[];
  accountOpeningView:AccountOpeningView[]=[];
  userControlList:UserFormControl[]=[];
  columnlist:any[]=[];
  DataList:any[]=[];
  constructor(private _accountDefinationService:AccountDefinationService,
  private _postLoginService:PostLoginService,
  private _alertBox:AlertBoxService) { }

  ngOnInit() {
    debugger
    this.getChildAccountList();
    this.getUserFormControlByFormName();
  }
  getChildAccountList(){
    this._accountDefinationService.getAccountListForAccountOpening().subscribe(response=>{
      this.accountOpeningView=response.json();
      this.accountOpeningView.forEach((a,index,array)=>{
        if(a.Group=="1"){
          a.Group="Asset";
          a.AccountType="Debit"
        }
        else if(a.Group=="2")
        {
          a.Group="Fund and liabilities";
          a.AccountType="Credit";
        }
        else if(a.Group=="3"){
          a.Group="Income";
          a.AccountType="Credit"
        }
        else{
        a.Group="Expense";
        a.AccountType="Debit"
        }
      });
      this.DataList= this.accountOpeningView;
    },
  error=>{
    let message=error.json();
    let dialogData=new DialogData();
    dialogData.message=message.Message;
    this._alertBox.openDialog(dialogData);
  })
  }
  getUserFormControlByFormName(){
    this._postLoginService.getUserFormControlByFormName('account-opening').subscribe(response=>{
      this.userControlList=response.json();
      this.columnlist=this.userControlList.filter(control=>control.Type!='none');
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getDataList(){

  }
  deleteVoucherDetailsRow($data){
    console.log($data);
  }
}
