import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { InventoryItem } from '../../../models/master-settings/inventory-defination/inventory-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ItemEntryComponent } from '../item-entry/item-entry.component';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  reload:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  inventoryItemList:InventoryItem[]=[];
  inventoryItem:InventoryItem={
    Id:null,Category_Id:null,ItemCode:null,ItemId:null,ItemName:null,
    Ledger_Id:null,SubLedger_Id:null,UnitId:null,SubCategory_Id:null
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getItemList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginservice.getUserFormControlByFormName('item-list').subscribe(response=>{
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getItemList(){
    this._inventotyDefinationService.getInventoryItemList().subscribe(response=>{
      this.inventoryItemList=response.json();
      this.DataList=this.inventoryItemList
      this.reload=true;
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getItemDetails($event:string){
    debugger
    this._inventotyDefinationService.getInventoryItemById($event).subscribe(response=>{
      this.inventoryItem=response.json();
      const dialogRef=this.matDialog.open(ItemEntryComponent,{
        data:this.inventoryItem,
        disableClose:true,
        height:window.screen.height*.95+'px', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getItemList();
        }
      })
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteItem($event:string){
    this._inventotyDefinationService.deleteInventoryItem($event).subscribe(response=>{
      let result=response.json();
      if(result){
        this.getItemList();
        let dialogData=new DialogData();
        dialogData.message="Category deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewItem(){
   this.clearItem();
    const dialogRef=this.matDialog.open(ItemEntryComponent,{
      data:this.inventoryItem,
      disableClose:true,
      height:window.screen.height*.95+'px',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getItemList();
      }
    })
  }
  clearItem(){
    this.inventoryItem.Id=null;
    this.inventoryItem.ItemCode=null;
    this.inventoryItem.ItemId=null;
    this.inventoryItem.ItemName=null;
    this.inventoryItem.Category_Id=null;
    this.inventoryItem.SubCategory_Id=null;
    this.inventoryItem.UnitId=null;
    this.inventoryItem.Ledger_Id=null;
    this.inventoryItem.SubLedger_Id=null;
  }
  controlItemForm(){
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"itementry",
      disableClose:true,
      //height:window.screen.height*.6+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     
    })
  }
}
