import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { GroupItem } from '../../../models/regular-operation/inventory/group-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ItemPurchaseComponent } from '../item-purchase/item-purchase.component';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';

@Component({
  selector: 'app-item-purchase-list',
  templateUrl: './item-purchase-list.component.html',
  styleUrls: ['./item-purchase-list.component.css']
})
export class ItemPurchaseListComponent implements OnInit {
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  groupItemList:GroupItem[]=[];
  groupItem:GroupItem={
    Id:null,TransactionId:null,TransactionType:null,Quantity:null,
    TotalAmount:null,Ledger_Id:null,SubLedger_Id:null,LedgerId:null,SubLedgerId:null,PaymentMode:0,
    Vat:null,Tax:null,DiscountAmount:null,DiscountRate:null,NetPaidAmount:null,Group_Id:null,ItemTransactionList:[]
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getGroupItemList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginservice.getUserFormControlByFormName('item-group').subscribe(response=>{
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  
  getGroupItemList(){
    this._inventotyDefinationService.getInventoryItemList().subscribe(response=>{
      this.groupItemList=response.json();
      this.DataList=this.groupItemList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getGroupItemDetails($event:string){
    debugger
    this._inventotyDefinationService.getInventoryItemById($event).subscribe(response=>{
      this.groupItem=response.json();
      const dialogRef=this.matDialog.open(ItemPurchaseComponent,{
        data:this.groupItem,
        disableClose:true,
        height:window.screen.height*.95+'px', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getGroupItemList();
        }
      })
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteGroupItem($event:string){
    this._inventotyDefinationService.deleteInventoryItem($event).subscribe(response=>{
      let result=response.json();
      if(result){
        this.getGroupItemList();
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
  createGroupItem(){
   this.clearItem();
    const dialogRef=this.matDialog.open(ItemPurchaseComponent,{
      data:this.groupItem,
      disableClose:true,
      height:window.screen.height*.95+'px',
      width:window.screen.width*1.2+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getGroupItemList();
      }
    })
  }
  clearItem(){
    // this.inventoryItem.Id=null;
    // this.inventoryItem.ItemCode=null;
    // this.inventoryItem.ItemId=null;
    // this.inventoryItem.ItemName=null;
    // this.inventoryItem.Category_Id=null;
    // this.inventoryItem.SubCategory_Id=null;
    // this.inventoryItem.UnitId=null;
    // this.inventoryItem.Ledger_Id=null;
    // this.inventoryItem.SubLedger_Id=null;
  }
  controlGroupItemForm(){
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"purchase-form",
      disableClose:true,
      height:window.screen.height*.9+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     
    })
  }

}
