import { Component, OnInit ,Inject} from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { ItemTransaction } from '../../../models/regular-operation/inventory/item-transaction.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-item-transaction-details',
  templateUrl: './item-transaction-details.component.html',
  styleUrls: ['./item-transaction-details.component.css']
})
export class ItemTransactionDetailsComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  itemTransactionList:ItemTransaction[]=[];
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    public matDialogRef:MatDialogRef<ItemTransactionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public customerId:string,
    private _customDatatableService:CustomDatatableService,
    private _inventotyService:InventoryService,
  ) { }
  ngOnInit() {
    debugger
    this.GetItemTransactionDetails();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('item-transaction-details').subscribe(response=>{
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
  GetItemTransactionDetails(){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.GetItemTransactionDetails(this.customerId).subscribe(response=>{
      this.blockUi.stop();
      this.itemTransactionList=response
      this.DataList=this.itemTransactionList;
      this._customDatatableService.DataList=this.itemTransactionList;
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
}
