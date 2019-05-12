import { Component, OnInit ,ViewChild, Input, OnChanges,Output,EventEmitter} from '@angular/core';
import { DialogData } from '../../../models/common/dialog-data.model';
import { CustomerTransaction } from '../../../models/regular-operation/inventory/customer-transaction.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormControl } from '@angular/forms';
import { GroupItem } from '../../../models/regular-operation/inventory/group-item.model';
import { Subject } from 'rxjs';
import { ItemTransactionDetailsComponent } from '../item-transaction-details/item-transaction-details.component';

@Component({
  selector: 'app-customer-transaction-list',
  templateUrl: './customer-transaction-list.component.html',
  styleUrls: ['./customer-transaction-list.component.css']
})
export class CustomerTransactionListComponent implements OnChanges,OnInit {
  @Input() customertransaction:CustomerTransaction;
  @Output() totalBalance:EventEmitter <any>=new EventEmitter <any>();
  @ViewChild('formDateControl') formDateControl:FormControl;
  @ViewChild('toDateControl') toDateControl:FormControl;
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  formDate:Date=new Date();
  initialload:boolean=true;
  toDate:Date=new Date();
  startDate:Date=new Date()
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  groupItemList:GroupItem[]=[];
  customerTransactionList:CustomerTransaction[]=[];
  customerTransaction:CustomerTransaction={
    
  }
  totalPayableAmount:number=0;
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _inventotyService:InventoryService,
  ) { }
  ngOnInit(){
    this.formDateControl.valueChanges.subscribe(data=>{
      debugger
      if(!this.initialload){
        this.GetSalesTransactionList(this.customertransaction.Customer_Id,data,this.toDate);
      }
    })
    this.toDateControl.valueChanges.subscribe(data=>{
      debugger
      if(!this.initialload){
      this.GetSalesTransactionList(this.customertransaction.Customer_Id,this.formDate,data);
      }
    })
  }
  ngOnChanges() {
    debugger
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.GetSalesTransactionList(this.customertransaction.Customer_Id,this.formDate,this.toDate);

  }
  GetSalesTransactionList(customerId:string,formDate:Date,toDate:Date){
    debugger
    //this.blockUi.start("Loading....,Please wait")
    this._inventotyService.GetSalesTransactionList(customerId,formDate,toDate).subscribe(response=>{
      this.blockUi.stop();
      this.initialload=false;
      this.groupItemList=response;
      this.totalPayableAmount=0;
      this.groupItemList.forEach(a=>{
        a.PayAmount=a.NetPayableAmount-a.PaidAmount;
        this.totalPayableAmount+=(a.NetPayableAmount-a.PaidAmount)
      })
      this.totalBalance.emit(this.totalPayableAmount);
      this.dtTrigger.next();
      this.dtTrigger.complete();
    },error=>{
      //this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getCustomerDetails($event:string){
    debugger
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.getPartyTransactionById($event).subscribe(response=>{
      this.blockUi.stop();
      this.customerTransaction=response
      // const dialogRef=this.matDialog.open(CustomerEntryComponent,{
      //   data:this.customer,
      //   disableClose:true,
      //   height:window.screen.height*.95+'px', 
      //   width:window.screen.width*.5+'px'
      // });
      // dialogRef.afterClosed().subscribe(result=>{
      //   if(result){
      //     this.getCustomerList();
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
  deleteCustomer($event:string){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.deletePartyTransactionById($event).subscribe(response=>{
      this.blockUi.stop();
      let result=response
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
  getItemTransactionDetails(Id:string){
    const dialogRef=this.matDialog.open(ItemTransactionDetailsComponent,{
      data:Id,
      disableClose:true,
      maxWidth:'100vw',
      maxHeight:'100vh',
      height:'70%',
      width:'95%'
    });
    dialogRef.afterClosed().subscribe(result=>{
      
    })
  }
  getCustomerTransactionDetails(customerId:string){

  }
  getCustomerList(){
    this.blockUi.start("Loading....,Please wait")
    this._inventotyService.getPartyTransactionList(this.formDate,this.toDate,this.customertransaction.Customer_Id).subscribe(response=>{
      this.blockUi.stop();
      this.customerTransactionList=response
      this.DataList=this.customerTransactionList;
      this._customDatatableService.DataList=this.customerTransactionList;
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
