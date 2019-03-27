import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Supplier } from '../../../models/master-settings/inventory-defination/supplier.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MatDialog } from '@angular/material';
import { SupplierEntryComponent } from '../supplier-entry/supplier-entry.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  supplierList:Supplier[]=[];
  supplier:Supplier={
    Id:null,SupplierId:null,SupplierName:null,ContactPerson:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private matDialog:MatDialog,
    private _inventotyDefinationService:InventoryDefinationServiceService,
  ) { }
  ngOnInit() {
    debugger
    this.getSupplierList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('supplier-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      this.blockUi.stop();
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getSupplierList(){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyDefinationService.getSupplierList().subscribe(response=>{
      this.blockUi.stop();
      this.supplierList=response.json();
      this.DataList=this.supplierList
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
    this._inventotyDefinationService.getSupplierById($event).subscribe(response=>{
      this.blockUi.stop();
      this.supplier=response.json();
      const dialogRef=this.matDialog.open(SupplierEntryComponent,{
        data:this.supplier,
        disableClose:true,
        height:window.screen.height*.95+'px', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getSupplierList();
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
  deleteSupplier($event:string){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyDefinationService.deleteSupplier($event).subscribe(response=>{
      this.blockUi.stop();
      let result=response.json();
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
  createNewSupplier(){
   this.clearSupplier();
    const dialogRef=this.matDialog.open(SupplierEntryComponent,{
      data:this.supplier,
      disableClose:true,
      height:window.screen.height*.95+'px',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getSupplierList();
      }
    })
  }
  clearSupplier(){
    this.supplier.Id=null;
    this.supplier.SupplierId=null;
    this.supplier.SupplierName=null;
    this.supplier.ContactPerson=null;
    this.supplier.PhoneNo=null;
    this.supplier.Email=null;
    this.supplier.Address=null;
    this.supplier.Ledger_Id=null;
    this.supplier.SubLedger_Id=null;
  }
}
