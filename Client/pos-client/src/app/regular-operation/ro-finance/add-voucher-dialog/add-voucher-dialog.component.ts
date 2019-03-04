import { Component, OnInit,Inject } from '@angular/core';
import { Voucher } from '../../../models/regular-operation/finance/voucher.model';
import { AccountsService } from '../../../services/regular-operation/accounts.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { ChartOfaccount } from '../../../models/master-settings/account-defination/chart-of-account.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { VoucherDeatils } from '../../../models/regular-operation/finance/voucher-details.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { PostLoginService } from '../../../services/common/post-login.service';

@Component({
  selector: 'app-add-voucher-dialog',
  templateUrl: './add-voucher-dialog.component.html',
  styleUrls: ['./add-voucher-dialog.component.css']
})
export class AddVoucherDialogComponent implements OnInit {
  userControlList:UserFormControl[]=[];
  account:ChartOfaccount;
  voucherList:Voucher[]=[];
  startDate = new Date(1990, 0, 1);
  voucher:Voucher={
    Id:null,
    VoucherDate:null,VoucherNo:null,ChequeDate:null,ChequeNo:null,VoucherType:"0",
    BankName:null,BankAccountNo:null,VoucherDetailsList:[]
  };
  accountList:ChartOfaccount[]=[];
  debitAcccountList:ChartOfaccount[]=[];
  columnlist:any=[];
  autoCompleteData=[];
  protected captains = ['male','female','unknown'];
  DataList:any=[];
  constructor(private _accountService:AccountsService,
    private _alertBox:AlertBoxService,
    private _loginService:PostLoginService,   
    public dialogRef:MatDialogRef<AddVoucherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Voucher
) 
{ }
  ngOnInit() {
    debugger
    this.voucher=this.data
    if(this.voucher.VoucherDetailsList.length==0){

    }
    this.getAccountList();
    //this.getColumnList();
    this.getUserFormControlByFormName();
    this.getDataList();
  }
  onNoClick():void{
    this.dialogRef.close();
  }
  getAccountList(){
    this._accountService.getChildAccountList().subscribe(response=>{
      this.accountList=response.json();
      this.accountList.forEach((account,index,array)=>{
        this.autoCompleteData.push(account.AccountDescription+"-"+account.AutoAccountCode)
      })
      this.getOneSideAccountForVoucher(this.voucher.VoucherType);
      if(this.voucher.VoucherDetailsList.length==0){
        var voucherDetail=new VoucherDeatils();
        voucherDetail.Lineno=1;
        voucherDetail.AccountId=this.debitAcccountList[0].Id;
        this.voucher.Amount=0;
        this.voucher.VoucherDetailsList.push(voucherDetail);
      }
      else{

      }
    },
  error=>{
    let message=error.json();
    let dialogData=new DialogData();
    dialogData.message=message.Message;
    this._alertBox.openDialog(dialogData);
  })
  }
  // getColumnList(){
  //   this.columnlist.push({Name:"AccountDescription",LabelName:"Account Code & Description",Type:'Autocomplete',Editable:true,Autocomplete:true})
  //   this.columnlist.push({Name:"Amount",LabelName:"Amount",Type:'number',Editable:true,Autocomplete:false})
  // }
  ParentAutoCompleteDataSource($event){
    debugger
    console.log($event)
  }
  getDataList(){
    this.DataList=this.voucher.VoucherDetailsList.filter(fea=>fea.Lineno!=1);
  }
  getOneSideAccountForVoucher(voucherType:string){
    if(voucherType=="0"||voucherType=="1"){
      this.debitAcccountList=this.accountList.filter(account=>account.AccountType=="1");
      if( this.debitAcccountList.length>0){
        this.voucher.VoucherDetailsList[0].AccountId=this.debitAcccountList[0].Id
      }
    }
    else if(voucherType=="2"||voucherType=="3"){
      this.debitAcccountList=this.accountList.filter(account=>account.AccountType=="2");
      if(this.debitAcccountList.length>0){
        this.voucher.VoucherDetailsList[0].AccountId=this.debitAcccountList[0].Id
      }
    }
    else if(voucherType=="4"||voucherType=="5"){
      this.debitAcccountList=this.accountList.filter(account=>account.AccountType=="0");
      if(this.debitAcccountList.length>0){
        this.voucher.VoucherDetailsList[0].AccountId=this.debitAcccountList[0].Id
      }
    }
  }
  voucherTypeChange($data){
    console.log($data);
    this.getOneSideAccountForVoucher($data)
  }
  getUserFormControlByFormName(){
    this._loginService.getUserFormControlByFormName('voucher').subscribe(response=>{
      this.userControlList=response.json();
      this.columnlist=this.userControlList;
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  addNewVoucherEntry(){
    let voucherDetails=new VoucherDeatils();
    voucherDetails.Lineno=3;
    voucherDetails.Amount=null;
    voucherDetails.Vat=null;
    voucherDetails.Tax=null
    this.voucher.VoucherDetailsList.push(voucherDetails);
    this.getDataList();
  }
}
