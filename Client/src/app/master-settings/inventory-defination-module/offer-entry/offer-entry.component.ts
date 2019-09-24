import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { OfferSetupValidation } from '../../../models/validation/inventory/offer-setup-validation.model';
import { NgForm, FormControl } from '@angular/forms';
import { OfferSetup } from '../../../models/master-settings/inventory-defination/offer-setup.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ValidationService } from '../../../services/common/validation.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';
import { DropdownService } from '../../../services/common/dropdown.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { SelectDropdown } from '../../../models/common/select.dropdown.model';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ItemEntryComponent } from '../item-entry/item-entry.component';
import { InventoryItem } from '../../../models/master-settings/inventory-defination/inventory-item.model';
import { Tree } from '../../../models/common/tree.model';

@Component({
  selector: 'app-offer-entry',
  templateUrl: './offer-entry.component.html',
  styleUrls: ['./offer-entry.component.css']
})
export class OfferEntryComponent implements OnInit {
  offerSetupValidation:OfferSetupValidation[]=[];
  @ViewChild('offerSetupForm') offerSetupForm:NgForm;
  @ViewChild('offerTypeControl') offerTypeControl:FormControl;
  itemList:SelectDropdown[]=[]
  ItemNew:boolean=false
  itemName:string="offerId";
  formName:string="offerSetup-entry";
  itemNew:boolean=false;
  subCategoryId:string=null;
  showItem:boolean=true
  IsAutoCode:boolean=false
  isFound:boolean=false;
  itemSelectedItems :MultiSelectDropdown[]= [
    { id: "0", itemName: "Select" }
  ];
  freeItemSelectedItems:MultiSelectDropdown[]= [
    { id: "0", itemName: "Select" }
  ];
  itemDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  inventoryItem:InventoryItem={
    Id:null,Category_Id:null,ItemCode:null,ItemId:null,ItemName:null,
    Ledger_Id:null,SubLedger_Id:null,UnitId:null,SubCategory_Id:null
  }
  itemTree:Tree[]=[];
  oldItemTree:Tree[]=[];
  constructor(public matDialogRef:MatDialogRef<OfferEntryComponent>,
    private _validationService:ValidationService,
  @Inject(MAT_DIALOG_DATA) public offerSetup:OfferSetup,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _dropdownService:DropdownService,
  private _navigationData:NavigationDataService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    $(document).ready(function(){
      $('#outDiv').click(function(e){
      
      })
    })
    this.offerTypeControl.valueChanges.subscribe(data=>{
      debugger
      if(data=="single"){
        this.offerSetup.IsSingle=true
      }
      else if(data=="oneToMany"){
        this.offerSetup.IsSingle=false;
        this.offerSetup.IsOneToMany=true;
      }
      else if(data=="manyToOne"){
        this.offerSetup.IsSingle=false;
        this.offerSetup.IsManyToOne=true;
      }
    })
    if(this.offerSetup.OfferId==null){      
    }
    else{
      this.freeItemSelectedItems=this.offerSetup.FreeProductList
      this.itemSelectedItems=this.offerSetup.ProductList
    }
    this.getItemList(null);
    this.getItemFormInfo();
    this.getItemTree();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemTree(){
    this._inventotyDefinationService.getitemTree().subscribe(response=>{
      this.itemTree=response;
      this.oldItemTree=JSON.parse(JSON.stringify(response));
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  findSelectedAccount(node:Tree,IsChecked:boolean){
    debugger
    this.isFound=false;
    this.oldItemTree.forEach((chartOfAcc,index,array)=>{
      if(chartOfAcc.Id.toLowerCase()==node.Id.toLowerCase()){
        this.isFound=true;
        chartOfAcc.IsClicked=true;
        chartOfAcc.Checked=IsChecked;
        if(chartOfAcc.Children!=null){
          this.checkedAllChildNode(chartOfAcc.Children,IsChecked)
        }
      }
      else{
        if(chartOfAcc.Children!=null&&chartOfAcc.Children.length>0){
          chartOfAcc.Children.forEach((chartOfAcc2,index,array)=>{
            if(chartOfAcc2.Id.toLowerCase()==node.Id.toLowerCase()){
              this.isFound=true;
              chartOfAcc2.IsClicked=true;
              chartOfAcc2.Checked=IsChecked;
              if(chartOfAcc2.Children!=null){
                this.checkedAllChildNode(chartOfAcc2.Children,IsChecked)
              }
           }
           else{
             if(chartOfAcc2.Children!=null&&chartOfAcc2.Children.length>0)
              this.findChildAccount(chartOfAcc2.Children,node,IsChecked)
           }
          })
        } 
      }
    })
    this.itemTree=this.oldItemTree;
  }
  findChildAccount(trees:Tree[],node:Tree,IsChecked:boolean){
    trees.forEach((coa,index,array)=>{
      if(coa.Id.toLowerCase()==node.Id.toLowerCase()){
          this.isFound=true;
          coa.IsClicked=true;
          coa.Checked=IsChecked;
          if(coa.Children!=null){
            this.checkedAllChildNode(coa.Children,IsChecked)
          }
      }
      else{
        if(coa.Children!=null&&coa.Children.length>0){
          this.findChildAccount(coa.Children,node,IsChecked)
        }
      }
    })
  }
  checkedAllChildNode(trees:Tree[],IsChecked:boolean){
    trees.forEach((coa,index,array)=>{
      coa.Checked=IsChecked;
      if(coa.Children!=null){
        this.checkedAllChildNode(coa.Children,IsChecked)
      }
    })
  }
  saveItem(){
    debugger
    // this.offerSetup.FreeProductList=this.freeItemSelectedItems;
    // this.offerSetup.ProductList=this.itemSelectedItems;
    if(this.offerSetup.ProductList.length==1&&this.offerSetup.ProductList.length>1){
      this.offerSetup.IsOneToMany=true
    }
    if(this.offerSetup.Id==null){
      this._inventotyDefinationService.CreateOfferSetup(this.offerSetup).subscribe(response=>{
        let result=response;
        this._navigationData.IsSaved=true
        if(result){
          this.matDialogRef.close(response);
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._inventotyDefinationService.UpdateOfferSetup(this.offerSetup).subscribe(response=>{
        let result=response
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  getItemList(subCategoryId:string){
    this._dropdownService.getItemDropdownList(subCategoryId).subscribe(response=>{
      this.itemList=response
      if(this.itemList.length>0){
        this.itemList.forEach((a,index,array)=>{
          this.itemDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewItem(){
    this.clearItem();
    this.itemNew=false;
     const dialogRef=this.matDialog.open(ItemEntryComponent,{
       data:this.inventoryItem,
       disableClose:true,
       height:window.screen.height*.6+'px',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe((result:InventoryItem)=>{
       if(result){
         this.ItemNew=true;
         this.itemSelectedItems=[];
         this.itemSelectedItems.push({id:result.Id,itemName:result.ItemId+'-'+result.ItemName})
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
   getItemFormInfo(){
    // this._validationService.getItemValidationData().subscribe((response:InventoryItemValidation[])=>{
    //   this.itemValidation=response
    // },error=>{
    //   let message=error;
    //   let dialogData=new DialogData();
    //   dialogData.message=message.Message;
    //   this._alertBox.openDialog(dialogData);
    // })
  }
  parentGetGeneratedCode($event:string){
    debugger
    this.offerSetup.OfferId=$event;
  }
  getSelectedItemParent($event:MultiSelectDropdown){
    debugger
    this.offerSetup.FreeProductList.push($event)
  }
  getSelectedProductParent($event:MultiSelectDropdown){
    debugger
    this.offerSetup.ProductList.push($event)
    this.offerSetup.BundleSize=this.offerSetup.ProductList.length
  }
  ItemOnSeletedItem($event:MultiSelectDropdown){
    if($event.id!="0"){
      this.offerSetup.Product_Id=$event.id
    }
    else{
      this.offerSetup.Product_Id=null
    }
  }
  showItemValueParent($event:boolean){
    debugger
    this.showItem=$event
  }
  clickOutsideOfMultiselect(){
    debugger
    this.showItem=true;
  }

}
