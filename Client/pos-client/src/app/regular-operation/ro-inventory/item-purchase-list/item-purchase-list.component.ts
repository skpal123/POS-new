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
import { ItemPurchaseValidation } from '../../../models/validation/item-purchase.validation.model';
import { ValidationService } from '../../../services/common/validation.service';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { FormInfo } from '../../../models/common/formInfo.model';

@Component({
  selector: 'app-item-purchase-list',
  templateUrl: './item-purchase-list.component.html',
  styleUrls: ['./item-purchase-list.component.css']
})
export class ItemPurchaseListComponent implements OnInit {
  reload:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  groupItemList:GroupItem[]=[];
  itemPurchaseValidationList:ItemPurchaseValidation[]=[];
  groupItem:GroupItem={
    Id:null,TransactionId:null,TransactionType:null,Quantity:null,data:[],
    TotalAmount:null,Ledger_Id:null,SubLedger_Id:null,LedgerId:null,SubLedgerId:null,PaymentMode:0,
    Vat:null,Tax:null,DiscountAmount:null,DiscountRate:null,NetPaidAmount:null,ItemTransactionList:[]
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _validationService:ValidationService,
    private _inventotyService:InventoryService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getGroupItemList();
    this.getUserFormControlByFormName();
    this.getItemPurchaseValidationList()
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
    this._inventotyService.getGroupItemList("Purchase").subscribe((response:GroupItem[])=>{
      this.groupItemList=response
      this.DataList=this.groupItemList
      this.reload=true;
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getGroupItemDetails($event:string){
    debugger
    this._inventotyService.getGroupItemById($event).subscribe((response:GroupItem)=>{
      this.groupItem=response;
      this.groupItem.data=this.itemPurchaseValidationList;
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
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteGroupItem($event:string){
    this._inventotyService.deleteGroupItem($event).subscribe((response:boolean)=>{
      let result=response;
      if(result){
        this.getGroupItemList();
        let dialogData=new DialogData();
        dialogData.message="Invoice deleted succesfully";
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
    this.groupItem.Id=null;
    this.groupItem.TransactionId=null;
    this.groupItem.ChalanNo=null;
    this.groupItem.InvoiceNo=null;
    this.groupItem.Supplier_Id=null;
    this.groupItem.Reason=null;
    this.groupItem.TransactionDate=null;
    this.groupItem.GrvNo=null;
    this.groupItem.GrvDate=null;
    this.groupItem.Comments=null;
    this.groupItem.LotNo=null;
    this.groupItem.TotalAmount=0
    this.groupItem.Quantity=0
    this.groupItem.DiscountRate=0
    this.groupItem.DiscountAmount=0
    this.groupItem.Vat=0
    this.groupItem.Tax=0
    this.groupItem.NetPaidAmount=0
    this.groupItem.Approver_Id=null
    this.groupItem.Ledger_Id=null
    this.groupItem.SubLedger_Id=null
    this.groupItem.PaymentMode=0
    this.groupItem.TransactionType==null;
    this.groupItem.ItemTransactionList=[];
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"purchase-form",
      disableClose:true,
      height:window.screen.height*.9+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       this.getItemPurchaseValidationList()
     }
    })
  }
  getItemPurchaseValidationList(){
    debugger
    this._validationService.getItemPurchaseValidationData("purchase-form").subscribe((response:ItemPurchaseValidation[])=>{
      this.itemPurchaseValidationList=response
      this.groupItem.data= this.itemPurchaseValidationList;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error.error.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
}
