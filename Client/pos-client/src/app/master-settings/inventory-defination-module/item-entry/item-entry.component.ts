import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { InventoryItem } from '../../../models/master-settings/inventory-defination/inventory-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { AddSubcategoryComponent } from '../add-subcategory/add-subcategory.component';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {
  
  @ViewChild('itemForm') itemForm:NgForm
  @ViewChild('categoryIdControl') categoryIdControl:FormControl
  @ViewChild('subcategoryIdControl') subcategoryIdControl:FormControl
  @ViewChild('unitIdControl') unitIdControl:FormControl
  @ViewChild('ledgerIdControl') ledgerIdControl:FormControl
  categoryTouch:boolean=false;
  subcategoryTouch:boolean=false;
  unitTouch:boolean=false;
  ledgerTouch:boolean=false;
  categoryNew:boolean=false;
  subcategoryNew:boolean=false;
  unitNew:boolean=false;
  categorySelectedItems :MultiSelectDropdown[]= [
  ];
  subcategorySelectedItems :MultiSelectDropdown[]= [
  ];
  unitSelectedItems :MultiSelectDropdown[]= [
  ];
  ledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  subledgerSelectedItems :MultiSelectDropdown[]= [
  ];
  category:Category={Id:null,CategoryId:null,CategoryName:null}
  subcategory:Subcategory={Id:null,SubCategoryId:null,SubCategoryName:null,Category_Id:null}
  constructor(public matDialogRef:MatDialogRef<ItemEntryComponent>,
  @Inject(MAT_DIALOG_DATA) public item:InventoryItem,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _newDropdownService:NewDropdownDataService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.item.Id==null){
      this.categorySelectedItems.push({id:"0",itemName:"SELECT"})
      this.subcategorySelectedItems.push({id:"0",itemName:"SELECT"})
      this.unitSelectedItems.push({id:"0",itemName:"SELECT"})
      this.ledgerSelectedItems.push({id:"0",itemName:"SELECT"})
      this.subledgerSelectedItems.push({id:"0",itemName:"SELECT"})
    }
    else{
      this.categorySelectedItems.push({id:this.item.Category_Id,itemName:this.item.CategoryName})
      this.subcategory.CategoryName=this.item.CategoryName;
      this.subcategory.Category_Id=this.item.Category_Id;
      this.subcategorySelectedItems.push({id:this.item.SubCategory_Id,itemName:this.item.SubCategoryName})
      this.unitSelectedItems.push({id:this.item.UnitId,itemName:this.item.UnitName})
      this.ledgerSelectedItems.push({id:this.item.Ledger_Id,itemName:this.item.LedgerName})
      this.subledgerSelectedItems.push({id:this.item.SubLedger_Id,itemName:this.item.SubLedgerName})
    }
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  saveItem(){
    debugger
    if(this.item.Id==null){
      console.log(this.item);
      this._inventotyDefinationService.CreateInventoryItem(this.item).subscribe(response=>{
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
      this._inventotyDefinationService.UpdateInventoryItem(this.item).subscribe(response=>{
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
  CategoryOnSeletedItem($event:MultiSelectDropdown){
    debugger
    this.categoryTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.item.Category_Id=$event.id;
      this.subcategory.Category_Id=$event.id;
      this.subcategory.CategoryName=$event.itemName;
      // this._newDropdownService.categorySelectedData.Value=$event.id;
      // this._newDropdownService.categorySelectedData.Text=$event.itemName;
    }
    else{
      this.item.Category_Id=null
    }
  }
  SubCategoryOnSeletedItem($event){
    debugger
    this.subcategoryTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.item.SubCategory_Id=$event.id;
      // this._newDropdownService.categorySelectedData.Value=$event.id;
      // this._newDropdownService.categorySelectedData.Text=$event.itemName;
    }
    else{
      this.item.SubCategory_Id=null
    }
  }
  unitOnSeletedItem($event){
    debugger
    this.unitTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.item.UnitId=$event.id;
    }
    else{
      this.item.UnitId=null
    }
  }
  ledgerOnSeletedItem($event){
    debugger
    this.ledgerTouch=true;
    if($event.id!=null&&$event.id!="0"){
      this.item.Ledger_Id=$event.id;
    }
    else{
      this.item.Ledger_Id=null
    }
  }
  subledgerOnSeletedItem($event){
    debugger
    if($event.id!=null&&$event.id!="0"){
      this.item.SubLedger_Id=$event.id;
    }
  }
  OnDeSeletedItem($event){
    console.log($event)
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
}
