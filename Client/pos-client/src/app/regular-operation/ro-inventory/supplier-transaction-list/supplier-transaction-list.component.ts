import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { SupplierTransaction } from '../../../models/regular-operation/inventory/supplier-transaction.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { DialogData } from '../../../models/common/dialog-data.model';

@Component({
  selector: 'app-supplier-transaction-list',
  templateUrl: './supplier-transaction-list.component.html',
  styleUrls: ['./supplier-transaction-list.component.css']
})
export class SupplierTransactionListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  supplierTransactionList:SupplierTransaction[]=[];
  supplierTransaction:SupplierTransaction={
    
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _inventotyService:InventoryService,
  ) { }
  ngOnInit() {
    debugger
    this.getSupplierList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('supplier-transaction-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response;
      this.ColumnList=this.userControlList;
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getSupplierList(){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.getPartyTransactionList().subscribe(response=>{
      this.blockUi.stop();
      this.supplierTransactionList=response
      this.DataList=this.supplierTransactionList;
      this._customDatatableService.DataList=this.supplierTransactionList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getSupplierDetails($event:string){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.getPartyTransactionById($event).subscribe(response=>{
      this.blockUi.stop();
      this.supplierTransaction=response
      // const dialogRef=this.matDialog.open(SupplierEntryComponent,{
      //   data:this.supplier,
      //   disableClose:true,
      //   height:window.screen.height*.95+'px', 
      //   width:window.screen.width*.5+'px'
      // });
      // dialogRef.afterClosed().subscribe(result=>{
      //   if(result){
      //     this.getSupplierList();
      //   }
      // })
    },error=>{
      this.blockUi.stop();
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSupplier($event:string){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.deletePartyTransactionById($event).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getSupplierList();
        let dialogData=new DialogData();
        dialogData.message="Supplier deleted succesfully";
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
}
