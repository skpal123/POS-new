import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Voucher } from '../../../models/regular-operation/finance/voucher.model';
import { AccountsService } from '../../../services/regular-operation/accounts.service';
import { MatDialog } from '@angular/material';
import { AddVoucherDialogComponent } from '../add-voucher-dialog/add-voucher-dialog.component';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { VoucherDeatils } from '../../../models/regular-operation/finance/voucher-details.model';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent implements OnInit {
  @Input() addContainerClass:boolean=true;
  @Input() addSpanClass:boolean=true;
  @Output() VoucherDetalisClicked:EventEmitter <any>=new EventEmitter <any>();
  addContainerClass1:boolean=true;
  addSpanClass1:boolean=true;
  voucherList:Voucher[]=[];
  voucher:Voucher={
    Id:null,
    VoucherDate:null,VoucherNo:null,ChequeDate:null,ChequeNo:null,VoucherType:"0",
    BankName:null,BankAccountNo:null,VoucherDetailsList:[]
  };
  constructor(private _accountService:AccountsService,
    private matDialog:MatDialog,private _alertBox:AlertBoxService) { }
  ngOnInit() {
    this.addContainerClass1=this.addContainerClass
    this.addSpanClass1=this.addSpanClass
    this.getVoucherList();
  }
  getVoucherList(){
    this._accountService.getVoucherList("2017-09-16","2017-09-16").subscribe(response=>{
      this.voucherList=response.json();
    },error=>{

    })
  }
  createNewVoucher(){
  this.clearVoucherData();
   const dialogRef=this.matDialog.open(AddVoucherDialogComponent,{
      data:this.voucher,
      disableClose:true,
      height:window.screen.height*.8+'px',
      width:window.screen.width*1+'px'
    })
  }
  getVoucherDetails($data){
      this._accountService.getVoucherDetailsById($data).subscribe(response=>{
        this.voucher=response.json();
        console.log(this.voucher)
        const dialogRef=this.matDialog.open(AddVoucherDialogComponent,{
          data:this.voucher,
          disableClose:true,
          height:window.screen.height*.8+'px',
          width:window.screen.width*.8+'px'
        })
      },error=>{
        let message=error.json();
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
  }
  clearVoucherData(){
    let voucherDetailsList:VoucherDeatils[]=[];
    this.voucher.Id=null;
    this.voucher.VoucherNo=null;
    this.voucher.VoucherDate=null;
    this.voucher.VoucherType="1";
    for(let i=1;i<=2;i++){
      let voucherDetails=new VoucherDeatils();
      voucherDetails.Lineno=i;
      voucherDetails.Amount=null;
      voucherDetails.Vat=null;
      voucherDetails.Tax=null
      voucherDetailsList.push(voucherDetails);
    }
    this.voucher.VoucherDetailsList=voucherDetailsList;
    this.voucher.ChequeDate=null;
    this.voucher.ChequeNo=null;
    this.voucher.BankAccountNo=null;
    this.voucher.BankName=null;
  }
 
}
