import { Component, OnInit,Inject } from '@angular/core';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ValidationService } from '../../../services/common/validation.service';
import { GroupItem } from '../../../models/regular-operation/inventory/group-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AddCategoryComponent } from '../../../master-settings/inventory-defination-module/add-category/add-category.component';
import { AddSubcategoryComponent } from '../../../master-settings/inventory-defination-module/add-subcategory/add-subcategory.component';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DropdownService } from '../../../services/common/dropdown.service';
import { SelectDropdown } from '../../../models/common/select.dropdown.model';
import { ItemPurchaseValidation } from '../../../models/validation/item-purchase.validation.model';

@Component({
  selector: 'app-item-purchase',
  templateUrl: './item-purchase.component.html',
  styleUrls: ['./item-purchase.component.css']
})
export class ItemPurchaseComponent implements OnInit {
  itemPurchaseForm:FormGroup
  purchaseValidation:ItemPurchaseValidation[]=[];
  ledgerTouch:boolean=false;
  subledgerTouch:boolean=false;
  categoryNew:boolean=false;
  subcategoryNew:boolean=false;
  unitNew:boolean=false;
  grandTotal:number=0;
  grandQuantity:number=0;

  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  itemDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  itemSelectedItems :MultiSelectDropdown[]= [
    { id: "0", itemName: "Select" }
  ];
  itemList:SelectDropdown[];
  locationDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  locationSelectedItems :MultiSelectDropdown[]= [
    { id: "0", itemName: "Select" }
  ];
  locationList:SelectDropdown[];
  DropdownSettings = {
    singleSelection: true,
    text: "Select",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  category:Category={Id:null,CategoryId:null,CategoryName:null}
  subcategory:Subcategory={Id:null,SubCategoryId:null,SubCategoryName:null,Category_Id:null}
  constructor(public matDialogRef:MatDialogRef<ItemPurchaseComponent>,
    private _validationService:ValidationService,
    private _dropdownService:DropdownService,
    @Inject(MAT_DIALOG_DATA) public groupItem:GroupItem,
    private _alertBox:AlertBoxService,
    private matDialog:MatDialog,
    private fb:FormBuilder,
    private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    this.getItemPurchaseValidationList();
    this.getItemList("null");
    this.getLocationList();
    this.itemPurchaseForm = this.fb.group({
      TransactionId: [''],
      ChalanNo: [''],
      InvoiceNo: [''],
      Supplier_Id: [''],
      Reason: ['0'],
      TransactionDate: [''],
      GrvNo: [''],
      GrvDate: [''],
      Comments: [''],
      LotNo: [''],
      TotalAmount: ['0',1>1?Validators.required:null],
      Quantity: ['0',Validators.required],
      DiscountRate: ['0'],
      DiscountAmount: ['0'],
      Vat: ['0'],
      Tax: ['0'],
      NetPaidAmount: ['0'],
      Group_Id: [''],
      Approver_Id: [''],
      Ledger_Id: ['',Validators.required],
      SubLedger_Id: [''],
      PaymentMode: ['0'],
      TransactionType: [''],
      ItemTransactionList: this.fb.array([
        this.addNewItemTransaction()
      ]),
    });
    this.itemPurchaseForm.valueChanges.subscribe(data=>{
      debugger
      this.logValidationMessages(this.itemPurchaseForm)
    })
    this.itemPurchaseForm.get('PaymentMode').valueChanges.subscribe(data=>{
      alert(data)
    })
    if(this.groupItem.Id==null){
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      // this.categorySelectedItems.push({id:this.item.Category_Id,itemName:this.item.CategoryName})
      // this.subcategory.CategoryName=this.item.CategoryName;
      // this.subcategory.Category_Id=this.item.Category_Id;
      // this.subcategorySelectedItems.push({id:this.item.SubCategory_Id,itemName:this.item.SubCategoryName})
      // this.unitSelectedItems.push({id:this.item.UnitId,itemName:this.item.UnitName})
      // this.ledgerSelectedItems.push({id:this.item.Ledger_Id,itemName:this.item.LedgerName})
      // this.subledgerSelectedItems.push({id:this.item.SubLedger_Id,itemName:this.item.SubLedgerName})
    }
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  setValidationDynamicly(){

  }
  getItemList(subCategoryId:string){
    this.itemSelectedItems=[];
    this._dropdownService.getItemDropdownList(subCategoryId).subscribe(response=>{
      this.itemList=response.json();
      if(this.itemList.length>0){
        this.itemList.forEach((a,index,array)=>{
          this.itemDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getLocationList(){
    this.locationSelectedItems=[];
    this._dropdownService.getLocationDropdownList().subscribe(response=>{
      this.locationList=response.json();
      if(this.locationList.length>0){
        this.locationList.forEach((a,index,array)=>{
          this.locationDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  saveGroupItem(){
    debugger
    if(this.groupItem.Id==null){
      console.log(this.groupItem);
      this._inventotyDefinationService.CreateInventoryItem(this.groupItem).subscribe(response=>{
        let result=response.json();
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let message=error.json();
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._inventotyDefinationService.UpdateInventoryItem(this.groupItem).subscribe(response=>{
        let result=response.json();
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let message=error.json();
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  itemOnItemSelect($event,index:number){
    debugger
    const control=(<FormGroup>this.itemPurchaseForm.get('ItemTransactionList')).controls[index]
    const selectedItem=<MultiSelectDropdown[]>control.get('Item_Id').value;
    if(selectedItem&&selectedItem[0].id=="0"){
      control.get('ItemId').setValue('');
    }
    else{
      control.get('ItemId').setValue(selectedItem);
    }
  }
  locationOnItemSelect($event,index:number){
    debugger
    const control=(<FormGroup>this.itemPurchaseForm.get('ItemTransactionList')).controls[index]
    const selectedLocation=<MultiSelectDropdown[]>control.get('Location_Id').value;
    if(selectedLocation&&selectedLocation[0].id=="0"){
      control.get('LocationId').setValue('');
    }
    else{
      control.get('LocationId').setValue(selectedLocation);
    }
  }
  ledgerOnSeletedItem($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.itemPurchaseForm.get('Ledger_Id').setValue($event.id);
      this.groupItem.Ledger_Id=$event.id;
    }
    else{
      this.itemPurchaseForm.get('Ledger_Id').setValue('');
    }
  }
  subledgerOnSeletedItem($event:MultiSelectDropdown){

  }
  selectedFormControl(index:number){
    debugger
    var totalAmount=0;
    const control=(<FormGroup>this.itemPurchaseForm.get('ItemTransactionList')).controls[index];
    var quantityControl=control.get('Quantity');
    var vatControl=control.get('Vat');
    var discountRateControl=control.get('DiscountRate');
    var discountAmountControl=control.get('DiscountAmount');
    var TotalAmountControl=control.get('TotalAmount');
    var unitCostControl=control.get('UnitCost');
    if(quantityControl&&quantityControl.value!="" &&unitCostControl&&unitCostControl.value!=""){
      totalAmount=Number(quantityControl.value)*Number(unitCostControl.value);
      TotalAmountControl.setValue(totalAmount);
    }
    if(discountRateControl&&discountRateControl.value!=""){
      let discountAmount=((Number(discountRateControl.value)*totalAmount)/100);
      discountAmountControl.setValue(discountAmount);
      totalAmount-=discountAmount;
      TotalAmountControl.setValue(totalAmount);
    }
    if(vatControl&&vatControl.value!=""){
      totalAmount+=Number(vatControl.value);
      TotalAmountControl.setValue(totalAmount);
    }
    this.getTotalQuantityAndAmount();
  }
  getTotalQuantityAndAmount(){
    debugger
    this.grandQuantity=0;
    this.grandTotal=0;
    const control=(<FormArray>this.itemPurchaseForm.get('ItemTransactionList')).controls;
    control.forEach((a,index,array)=>{
      var quantityControl=a.get('Quantity');
      if(quantityControl&&quantityControl.value!=""){
        this.grandQuantity+=quantityControl.value;
      }
      var TotalAmountControl=a.get('TotalAmount');
      if(TotalAmountControl&&TotalAmountControl.value!=""){
        this.grandTotal+=TotalAmountControl.value;
      }
    });
    var discountRateControl=this.itemPurchaseForm.get('DiscountRate');
    var discountAmountControl=this.itemPurchaseForm.get('DiscountAmount');
    var discountAmount=0;
    if(discountRateControl&&discountRateControl.value!=""){
      discountAmount=((Number(discountRateControl.value)*this.grandTotal)/100);
      discountAmountControl.setValue(discountAmount);
    }
    if(this.itemPurchaseForm.get('Quantity')){
      this.itemPurchaseForm.get('Quantity').setValue(this.grandQuantity);
    }
    if(this.itemPurchaseForm.get('TotalAmount')){
      this.itemPurchaseForm.get('TotalAmount').setValue(this.grandTotal);
    }
    if( this.itemPurchaseForm.get('NetPaidAmount')){
      this.itemPurchaseForm.get('NetPaidAmount').setValue(this.grandTotal-discountAmount);
    }
  }
  slectedGroupControl(){
    this.getTotalQuantityAndAmount();
  }
  createNewCategory(){
     const dialogRef=this.matDialog.open(AddCategoryComponent,{
       data:this.category,
       disableClose:true,
       height:window.screen.height*.6+'px',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe(result=>{
       if(result){
         this.categoryNew=true;
       }
     })
   }
   createNewSubCategory(){
    this.subcategoryNew=false;
     const dialogRef=this.matDialog.open(AddSubcategoryComponent,{
       data:this.subcategory,
       disableClose:true,
       height:window.screen.height*.6+'px',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe(result=>{
       if(result){
         this.subcategoryNew=true;
         this.subcategory.SubCategoryId=null;
         this.subcategory.SubCategoryName=null;
       }
     })
   }
  //  getItemFormInfo(){
  //   this._validationService.getItemValidationData().subscribe((response:InventoryItemValidation[])=>{
  //     this.itemValidation=response
  //   },error=>{
  //     let message=error;
  //     let dialogData=new DialogData();
  //     dialogData.message=message.Message;
  //     this._alertBox.openDialog(dialogData);
  //   })
  // }
 
   logValidationMessages(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach((key:string)=>{
     const abastractControl=formGroup.get(key);
     console.log(key)
     if(abastractControl instanceof FormGroup){
       this.logValidationMessages(abastractControl)
     }
     else if(abastractControl instanceof FormArray){
       for(const control of abastractControl.controls){
         if(control instanceof FormGroup){
           this.logValidationMessages(control)
         }
         else{
          alert(control.value);
         }
       }
     }
     else{
      //  this.formErrors[key]=''
      //  if(abastractControl&& !abastractControl.valid&&abastractControl.touched){
      //    const message=this.validationMessage[key];
      //    for(const errorKey in abastractControl.errors){
      //      this.formErrors[key]+=message[errorKey]+' ';
      //    }
        
      //  }
     }
    })
   }
   addNewItemTransactions(){
      (<FormArray>this.itemPurchaseForm.get('ItemTransactionList')).push(this.addNewItemTransaction());
    }
  addNewItemTransaction():FormGroup{
  return this.fb.group({
    SerialNo: [''],
    TransactionId: ['',Validators.required],
    Item_Id: [this.itemSelectedItems],
    Location_Id: [this.locationSelectedItems],
    ItemId: ['',Validators.required],
    LocationId: ['',Validators.required],
    TransactionType: [''],
    Quantity: ['0',Validators.required],
    UnitCost: [0],
    UnitSale: ['0'],
    TotalAmount: ['0'],
    DiscountRate: ['0'],
    DiscountAmount: ['0'],
    Vat: ['0'],
    Tax: ['0']
  })
 }
 removeItemTransaction(index:number){
  (<FormArray>this.itemPurchaseForm.get('ItemTransactionList')).removeAt(index)
}
 save(){
  console.log(this.itemPurchaseForm.value);
  this.logValidationMessages(this.itemPurchaseForm);
}
getItemPurchaseValidationList(){
  this._validationService.getItemPurchaseValidationData().subscribe((response:ItemPurchaseValidation[])=>{
    this.purchaseValidation=response
  },error=>{
    let message=error.json();
    let dialogData=new DialogData();
    dialogData.message=message.Message;
    this._alertBox.openDialog(dialogData);
  })
}
}
