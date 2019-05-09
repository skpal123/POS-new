import { Component, OnInit, ViewChild,Output,EventEmitter } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm, FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { CustomerTransaction } from '../../../models/regular-operation/inventory/customer-transaction.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MatDialog } from '@angular/material';
import { Customer } from '../../../models/master-settings/inventory-defination/customer.model';
import { CustomerEntryComponent } from '../../../master-settings/inventory-defination-module/customer-entry/customer-entry.component';

@Component({
  selector: 'app-customer-transaction-entry',
  templateUrl: './customer-transaction-entry.component.html',
  styleUrls: ['./customer-transaction-entry.component.css']
})
export class CustomerTransactionEntryComponent implements OnInit {
  @Output() customerIdClick:EventEmitter <any>=new EventEmitter <any>();
  customerNew:boolean=false
  paymentType:string="payment";
  @BlockUI() blockUi:NgBlockUI
  @ViewChild('customerTransactionForm') itemForm:NgForm
  @ViewChild('ledgerIdControl') ledgerIdControl:FormControl
  ledgerTouch:boolean=false;
  customerSelectedItems :MultiSelectDropdown[]= [
  ];
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  customer:Customer={
    Id:null,CustomerId:null,CustomerName:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  customerTransaction:CustomerTransaction={
    Id:null,ChalanNo:null,OrderNo:null,PaymentMode:"0",PaymentDate:new Date(),Ledger_Id:null,
    SubLedger_Id:null,Group_Id:null,Customer_Id:null,PaidAmount:0
  }
  constructor(private matDialog:MatDialog,
  private _alertBox:AlertBoxService,
  private _newDropdownService:NewDropdownDataService,
  private _inventotyService:InventoryService,
) { }

  ngOnInit() {
    debugger
    if(this.customerTransaction.Id==null){
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.customerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      this.ledgerSelectedItems.push({id:this.customerTransaction.Ledger_Id,itemName:this.customerTransaction.LedgerName})
      this.subledgerSelectedItems.push({id:this.customerTransaction.SubLedger_Id,itemName:this.customerTransaction.SubLedgerName})
    }
  }
  saveCustomerTransaction(){
    debugger
    if(this.paymentType=="refund"){
      this.customerTransaction.PaidAmount*-1;
    }
    if(this.customerTransaction.Id==null){
      this.blockUi.start("Loading....,Please wait")
      this._inventotyService.savePartyTransaction(this.customerTransaction).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        this.blockUi.stop();
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this.blockUi.start("Loading....,Please wait")
      this._inventotyService.UpdatePartyTransaction(this.customerTransaction).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        this.blockUi.stop();
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
  }

  ledgerOnSeletedItem($event){
    debugger
    this.ledgerTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.customerTransaction.Ledger_Id=$event.id;
    }
    else{
      this.customerTransaction.Ledger_Id=null
    }
  }
  subledgerOnSeletedItem($event){
    debugger
    if($event.id!=null&&$event.id!="0"){
      this.customerTransaction.SubLedger_Id=$event.id;
    }
    else{
      this.customerTransaction.SubLedger_Id=null
    }
  }
  customerOnSeletedItem($event:MultiSelectDropdown){
    debugger
    this.customerIdClick.emit($event.id);
    if($event.id!="0"){
      this.customerTransaction.Customer_Id=$event.id;
    }
    else{
      this.customerTransaction.Customer_Id=null;
    }
  }
  createNewCustomer(){
    const dialogRef=this.matDialog.open(CustomerEntryComponent,{
      data:this.customer,
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      debugger
      if(result){
        this.customerNew=true;
      }
    })
  }
}
