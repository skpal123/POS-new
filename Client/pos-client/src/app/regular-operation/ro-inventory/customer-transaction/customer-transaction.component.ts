import { Component, OnInit ,ViewChild} from '@angular/core';
import { CustomerTransaction } from '../../../models/regular-operation/inventory/customer-transaction.model';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { GroupItem } from '../../../models/regular-operation/inventory/group-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog } from '@angular/material';
import { InventoryService } from '../../../services/regular-operation/inventory.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ItemTransactionDetailsComponent } from '../item-transaction-details/item-transaction-details.component';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { Customer } from '../../../models/master-settings/inventory-defination/customer.model';
import { CustomerEntryComponent } from '../../../master-settings/inventory-defination-module/customer-entry/customer-entry.component';
import { CustomerSupplierTransactionDetails } from '../../../models/regular-operation/inventory/customer-supplier-transaction-details.model';

@Component({
  selector: 'app-customer-transaction',
  templateUrl: './customer-transaction.component.html',
  styleUrls: ['./customer-transaction.component.css']
})
export class CustomerTransactionComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  @ViewChild('customerTransactionForm') itemForm:NgForm
  @ViewChild('ledgerIdControl') ledgerIdControl:FormControl
  @ViewChild('PaidAmountControl') PaidAmountControl:FormControl
  @ViewChild('formDateControl') formDateControl:FormControl;
  @ViewChild('toDateControl') toDateControl:FormControl;
  ledgerTouch:boolean=false;
  checkedItems:CheckedItem[]=[];
  paymentModeFilter:boolean=true;
  customerSelectedItems :MultiSelectDropdown[]= [
  ];
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [  
  ];
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  formDate:Date=new Date();
  initialload:boolean=true;
  toDate:Date=new Date();
  startDate:Date=new Date()
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  groupItemList:GroupItem[]=[];
  oldGroupItemList:GroupItem[]=[];
  customerTransactionList:CustomerTransaction[]=[];
  customerNew:boolean=false
  paymentType:string="payment";
  paymentMethod:string="general";
  totalBalance1:number=0;
  customer:Customer={
    Id:null,CustomerId:null,CustomerName:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  customerTransaction:CustomerTransaction={
    Id:null,ChalanNo:null,OrderNo:null,InvoiceNo:null,PaymentMode:"-1",PaymentDate:new Date(),Ledger_Id:null,
    SubLedger_Id:null,Group_Id:null,Customer_Id:null,PaidAmount:0,PaymentMethod:"general",
    PaymentType:"payment",TotalDueAdvanceAmount:0,TransactionDetailsList:[]
  }
  totalPayableAmount:number=0;
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _inventotyService:InventoryService,
  ) { }
  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.GetSalesTransactionList(this.customerTransaction.Customer_Id,this.formDate,this.toDate);
    this.formDateControl.valueChanges.subscribe(data=>{
      debugger
      if(!this.initialload){
        this.GetSalesTransactionList(this.customerTransaction.Customer_Id,data,this.toDate);
      }
    })
    this.toDateControl.valueChanges.subscribe(data=>{
      debugger
      if(!this.initialload){
      this.GetSalesTransactionList(this.customerTransaction.Customer_Id,this.formDate,data);
      }
    })
    this.PaidAmountControl.valueChanges.subscribe(data=>{
      if(this.customerTransaction.PaymentMethod=="general"){
        this.distributedTotalAmount(data)
      }
    })
  }
  GetSalesTransactionList(customerId:string,formDate:Date,toDate:Date){
    debugger
    this.customerTransaction.TotalDueAdvanceAmount=0;
    //this.blockUi.start("Loading....,Please wait")
    this._inventotyService.GetSalesTransactionList(customerId,formDate,toDate).subscribe(response=>{
      this.blockUi.stop();
      this.initialload=false;
      this.groupItemList=response;
      this.totalPayableAmount=0;
      this.groupItemList.forEach(a=>{
        a.PayAmount=(a.NetPayableAmount-a.PaidAmount);
        this.customerTransaction.TotalDueAdvanceAmount+=(a.NetPayableAmount-a.PaidAmount);
        this.checkedItems.push({IsChecked:false});
      })
      this.dtTrigger.next();
      this.dtTrigger.subscribe();
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
      let message=error
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
      let dialogData=new DialogData();
      dialogData.message=error
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
    this._inventotyService.getPartyTransactionList(this.formDate,this.toDate,this.customerTransaction.Customer_Id).subscribe(response=>{
      this.blockUi.stop();
      this.customerTransactionList=response
      this.DataList=this.customerTransactionList;
      this._customDatatableService.DataList=this.customerTransactionList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
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
    if($event.id!="0"){
      this.customerTransaction.Customer_Id=$event.id;
      this.GetSalesTransactionList(this.customerTransaction.Customer_Id,this.formDate,this.toDate);
    }
    else{
      this.groupItemList=[];
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
  distributedTotalAmount(tAmount:number){
    debugger
    let totalAmount=Number(tAmount)
    let totalAmount2=Number(tAmount)
    this.checkedItems.forEach(a=>{
      a.IsChecked=false;
    })
    if(totalAmount!=0){
      let isFound=false;
      this.groupItemList.forEach((a,index)=>{
        if(totalAmount>(a.NetPayableAmount-a.PaidAmount)){
          totalAmount-=(a.NetPayableAmount-a.PaidAmount)
          a.PayAmount=(a.NetPayableAmount-a.PaidAmount);
        }
        else{
          if(!isFound){
            a.PayAmount=totalAmount;
            isFound=true;
          }
        }
      })
      let amount2=0
      let isfound=false
      let firstAmount=this.groupItemList[0].NetPayableAmount-this.groupItemList[0].PaidAmount
      this.groupItemList.forEach((a,index)=>{
        if(firstAmount<totalAmount2){
          if(totalAmount2>amount2){
            amount2+=this.groupItemList[index].NetPayableAmount-this.groupItemList[index].PaidAmount;
            isfound=true;
            this.checkedItems[index].IsChecked=true;
          }
          else{
            if(!isfound){
              alert(index)
            }
          }
        }
        else{
          this.checkedItems[0].IsChecked=true;
        }
      })
    }
    else{
      this.groupItemList.forEach(a=>{
        a.PayAmount=(a.NetPayableAmount-a.PaidAmount)
      })
    }
  }
  changePaidAmount(index:number){
    this.customerTransaction.PaidAmount=0;
    this.groupItemList.forEach((a,i)=>{
      if(this.checkedItems[i].IsChecked){
        this.customerTransaction.PaidAmount+=a.PayAmount
      }
    })
  }
  changeChoose($event,index:number){
    if(this.customerTransaction.PaymentMethod=='specific')
    if($event.target.checked){
      this.customerTransaction.PaidAmount+=Number(this.groupItemList[index].PayAmount)
    }
    else{
      if(this.customerTransaction.PaidAmount>0){
        this.customerTransaction.PaidAmount-=Number(this.groupItemList[index].PayAmount)
      }
    }
  }
  saveCustomerTransaction(){
    debugger
    this.customerTransaction.TransactionDetailsList=[];
    if(this.groupItemList.length>0){
      this.customerTransaction.InvoiceNo=this.groupItemList[0].InvoiceNo;
      this.customerTransaction.Group_Id=this.groupItemList[0].Id;
    }
    this.groupItemList.forEach((a,index)=>{
      if(this.checkedItems[index].IsChecked){
        var transactionDetails=new CustomerSupplierTransactionDetails();
        transactionDetails.Group_Id=a.Id;
        transactionDetails.InvoiceNo=a.InvoiceNo;
        transactionDetails.PaidAmount=a.PaidAmount;
        transactionDetails.PaymentDate=this.customerTransaction.PaymentDate;
        this.customerTransaction.TransactionDetailsList.push(transactionDetails);
      }
    })
    if(this.customerTransaction.PaymentType=="refund"){
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
        let dialogData=new DialogData();
        dialogData.message=error
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
  dueAmountPaymentMethod(paymentMethod:string){

  }
  fullPayChange($event){
    if($event.target.checked){
      this.customerTransaction.PaidAmount=this.customerTransaction.TotalDueAdvanceAmount;
    }
    else{
      this.customerTransaction.PaidAmount=0;
    }
  }
}
export class CheckedItem{
  IsChecked:boolean;
}
