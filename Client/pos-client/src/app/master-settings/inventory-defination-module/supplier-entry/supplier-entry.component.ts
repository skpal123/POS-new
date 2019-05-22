import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgForm, FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Supplier } from '../../../models/master-settings/inventory-defination/supplier.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';
import { ValidationService } from '../../../services/common/validation.service';
import { SupplierValidation } from '../../../models/validation/inventory/supplier-validation.model';

@Component({
  selector: 'app-supplier-entry',
  templateUrl: './supplier-entry.component.html',
  styleUrls: ['./supplier-entry.component.css']
})
export class SupplierEntryComponent implements OnInit {
  supplierValidation:SupplierValidation[]=[];
  @BlockUI() blockUi:NgBlockUI;
  @ViewChild('supplierForm') supplierForm:NgForm
  @ViewChild('ledgerIdControl') ledgerIdControl:FormControl
  ledgerTouch:boolean=false;
  allLedger:boolean=true;
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  constructor(public matDialogRef:MatDialogRef<SupplierEntryComponent>,
  @Inject(MAT_DIALOG_DATA) public supplier:Supplier,
  private _alertBox:AlertBoxService,
  private _validationService:ValidationService,
  private matDialog:MatDialog,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.supplier.Id==null){
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      this.ledgerSelectedItems.push({id:this.supplier.Ledger_Id,itemName:this.supplier.LedgerName})
      this.subledgerSelectedItems.push({id:this.supplier.SubLedger_Id,itemName:this.supplier.SubLedgerName})
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getSupplierValidationData().subscribe((response:SupplierValidation[])=>{
      this.supplierValidation=response
    },error=>{
      let message=error;
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  saveSupplier(){
    debugger
    if(this.supplier.Id==null){
      console.log(this.supplier);
      this.blockUi.start("Loading....,Please wait")
      this._inventotyDefinationService.CreateSupplier(this.supplier).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          this.matDialogRef.close(response);
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
      this._inventotyDefinationService.UpdateSupplier(this.supplier).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          this.matDialogRef.close(true);
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
      this.supplier.Ledger_Id=$event.id;
    }
    else{
      this.supplier.Ledger_Id=null;
      this.subledgerSelectedItems=[];
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
  }
  subledgerOnSeletedItem($event){
    debugger
    if($event.id!=null&&$event.id!="0"){
      this.supplier.SubLedger_Id=$event.id;
    }
    else{
      this.supplier.SubLedger_Id=null;
    }
  }
  OnDeSeletedItem($event){
    console.log($event)
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"supplier-entry",
      disableClose:true,
      height:window.screen.height*.9+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       //this.getItemPurchaseValidationList()
     }
    })
  }
}
