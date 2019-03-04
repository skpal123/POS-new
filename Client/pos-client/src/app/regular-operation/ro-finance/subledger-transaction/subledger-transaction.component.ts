import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { MatDialogRef } from '@angular/material';
import { AccountsService } from '../../../services/regular-operation/accounts.service';
import { SubledgerTransaction } from '../../../models/regular-operation/finance/subledger-transaction.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { SubledgerDialogData } from '../../../models/regular-operation/finance/subledger-dialog-data.model';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { Subledger } from '../../../models/master-settings/account-defination/subledger.model';
import { SubledgerTransactionDataService } from 'src/app/regular-operation/ro-finance/subledger-transaction-data.service';

@Component({
  selector: 'app-subledger-transaction',
  templateUrl: './subledger-transaction.component.html',
  styleUrls: ['./subledger-transaction.component.css']
})
export class SubledgerTransactionComponent implements OnInit,OnDestroy {
  userControlList:UserFormControl[]=[];
  columnlist:any[]=[];
  subledgerList:Subledger[];
  autoCompleteData=[];
  Datalist:any[]=[];
  subledgerData:SubledgerDialogData={AccountId:null,SubledgerTransactionList:[]}
  constructor(private _accountService:AccountDefinationService,
    private _alertBox:AlertBoxService,
    private _loginService:PostLoginService,  
    private _subledgerDataService:SubledgerTransactionDataService, 
    public dialogRef:MatDialogRef<SubledgerTransactionComponent>,
    @Inject(MatDialogRef) public data: SubledgerDialogData
) 
{ 
  this.subledgerData=_subledgerDataService.subledgerDialogData;
}

  ngOnInit() {
    debugger
    //this.subledgerData=this.data;
    this.getUserFormControlByFormName();
    this.geSubledgerList()
    this.Datalist=this.subledgerData.SubledgerTransactionList;
  }
  onNoClick():void{
    this.dialogRef.close(this.subledgerData);
  }
  getUserFormControlByFormName(){
    this._loginService.getUserFormControlByFormName('subledger-transaction').subscribe(response=>{
      this.userControlList=response.json();
      this.columnlist=this.userControlList;
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  geSubledgerList(){
    this._accountService.GetSublederList(this.subledgerData.AccountId).subscribe(response=>{
      this.subledgerList=response.json();
      this.subledgerList.forEach((a,index,array)=>{
        this.autoCompleteData.push(a.Description+'-'+a.SublederCode);
      })
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  ngOnDestroy(){
    //this.subledgerData.AccountId=null;
    //this.subledgerData.SubledgerTransactionList=[];
  }
  ParentAutoCompleteDataSource($event:string){
    if($event!=null){
      let code=$event.split('-')[1];
      let subledger=this.subledgerList.filter(x=>x.SublederCode==code)[0];
      let position=this.subledgerData.SubledgerTransactionList.findIndex(x=>x.SubledgerDescription==$event);
      if(subledger){
        this.subledgerData.SubledgerTransactionList[position].Account_Id=this.subledgerData.AccountId;
        this.subledgerData.SubledgerTransactionList[position].SubLedger_Id=subledger.Id;
      }
    }
  }
  postSubledger(){
    this.dialogRef.close(this.subledgerData);
  }
  createNewSubledger(){
    
  }
}
