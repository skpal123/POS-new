import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {
  @ViewChild('subcategoryForm') subcategoryForm:NgForm
  categorySelectedItems :MultiSelectDropdown[]= [
  ];
  categoryNew:boolean=false;
  category:Category={Id:null,CategoryId:null,CategoryName:null}
  constructor(public matDialogRef:MatDialogRef<AddSubcategoryComponent>,
  @Inject(MAT_DIALOG_DATA) public subcategory:Subcategory,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.subcategory.Id==null&&this.subcategory.Category_Id!=null){
      this.subcategoryForm.control.markAsDirty();
      this.categorySelectedItems.push({id:this.subcategory.Category_Id,itemName:this.subcategory.CategoryName}) 
    }
    else if(this.subcategory.Id==null){
      this.categorySelectedItems.push({id:"0",itemName:"SELECT"})   
    }
    else{
      this.subcategoryForm.control.markAsDirty();
      this.categorySelectedItems.push({id:this.subcategory.Category_Id,itemName:this.subcategory.CategoryName})
    }
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  saveSubCategory(){
    debugger
    if(this.subcategory.Id==null){
      console.log(this.subcategory);
      this._inventotyDefinationService.CreateSubCategory(this.subcategory).subscribe(response=>{
        let result=response
        if(result){
          this.matDialogRef.close(response);
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._inventotyDefinationService.UpdateSubCategory(this.subcategory).subscribe(response=>{
        let result=response
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  OnSeletedItem($event:MultiSelectDropdown){
    this.subcategory.Category_Id=$event.id;
    console.log($event)
  }
  OnDeSeletedItem($event){
    console.log($event)
  }
  clearSubCategory(){
    this.subcategory.Id=null;
    this.categorySelectedItems[0].id="0";
    this.categorySelectedItems[0].itemName="Select"
    this.subcategory.SubCategoryId=null;
    this.subcategory.SubCategoryName=null;
    this.subcategory.Category_Id=null;
    this.subcategoryForm.reset();
  }
  createNewCategory(){
    this.clearCategory();
    this.categoryNew=false;
     const dialogRef=this.matDialog.open(AddCategoryComponent,{
       data:this.category,
       disableClose:true,
       height:window.screen.height*.6+'px',
       width:window.screen.width*.4+'px'
     });
     dialogRef.afterClosed().subscribe((result:Category)=>{
       if(result){
         this.categoryNew=true;
         this.categorySelectedItems=[];
         this.categorySelectedItems.push({id:result.Id,itemName:result.CategoryId+'-'+result.CategoryName})
       }
     })
   }
   clearCategory(){
    this.category.Id=null;
    this.category.CategoryId=null;
    this.category.CategoryName=null;
  }
}
