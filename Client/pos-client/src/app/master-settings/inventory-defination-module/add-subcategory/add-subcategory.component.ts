import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {
  @ViewChild('subcategoryForm') unitForm:NgForm
  categorySelectedItems :MultiSelectDropdown[]= [
  ];
  constructor(public matDialogRef:MatDialogRef<AddSubcategoryComponent>,
  @Inject(MAT_DIALOG_DATA) public subcategory:Subcategory,
  private _alertBox:AlertBoxService,
  private _newDropdownData:NewDropdownDataService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.subcategory.Id==null&&this.subcategory.Category_Id!=null){
      this.categorySelectedItems.push({id:this.subcategory.Category_Id,itemName:this.subcategory.CategoryName}) 
    }
    else if(this.subcategory.Id==null){
      this.categorySelectedItems.push({id:"0",itemName:"SELECT"})   
    }
    else{
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
      this._inventotyDefinationService.UpdateSubCategory(this.subcategory).subscribe(response=>{
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
  OnSeletedItem($event:MultiSelectDropdown){
    this.subcategory.Category_Id=$event.id;
    console.log($event)
  }
  OnDeSeletedItem($event){
    console.log($event)
  }
}
