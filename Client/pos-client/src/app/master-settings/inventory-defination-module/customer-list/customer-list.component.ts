import { Component, OnInit } from '@angular/core';
import { BlockUI,NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Customer } from '../../../models/master-settings/inventory-defination/customer.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { MatDialog } from '@angular/material';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { CustomerEntryComponent } from '../customer-entry/customer-entry.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  customerList:Customer[]=[];
  customer:Customer={
    Id:null,CustomerId:null,CustomerName:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private matDialog:MatDialog,
    private _inventotyDefinationService:InventoryDefinationServiceService,
  ) { }
  ngOnInit() {
    debugger
    this.getCustomerList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('customer-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
      this.reload=true;
    },error=>{
      this.blockUi.stop();
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerList(){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyDefinationService.getCustomerList().subscribe(response=>{
      this.blockUi.stop();
      this.customerList=response.json();
      this.DataList=this.customerList
    },error=>{
      this.blockUi.stop();
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerDetails($event:string){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._inventotyDefinationService.getCustomerById($event).subscribe(response=>{
      this.blockUi.stop();
      this.customer=response.json();
      const dialogRef=this.matDialog.open(CustomerEntryComponent,{
        data:this.customer,
        disableClose:true,
        height:window.screen.height*.95+'px', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getCustomerList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteCustomer($event:string){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyDefinationService.deleteCustomer($event).subscribe(response=>{
      this.blockUi.stop();
      let result=response.json();
      if(result){
        this.getCustomerList();
        let dialogData=new DialogData();
        dialogData.message="Customer deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewCustomer(){
   this.clearCustomer();
    const dialogRef=this.matDialog.open(CustomerEntryComponent,{
      data:this.customer,
      disableClose:true,
      height:window.screen.height*.95+'px',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getCustomerList();
      }
    })
  }
  clearCustomer(){
    this.customer.Id=null;
    this.customer.CustomerId=null;
    this.customer.CustomerName=null;
    this.customer.PhoneNo=null;
    this.customer.Email=null;
    this.customer.Address=null;
    this.customer.Ledger_Id=null;
    this.customer.SubLedger_Id=null;
  }
}
