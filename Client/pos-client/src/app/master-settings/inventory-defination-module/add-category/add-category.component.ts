import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  @ViewChild('categoryForm') categoryForm:NgForm
  constructor(public matDialogRef:MatDialogRef<AddCategoryComponent>,
  @Inject(MAT_DIALOG_DATA) public category:Category,
  private _alertBox:AlertBoxService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    if(this.category.Id!=null){
      this.categoryForm.control.markAsDirty();
    }
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  saveCategory(){
    if(this.category.Id==null){
      this._inventotyDefinationService.CreateCategory(this.category).subscribe(response=>{
        let result=response
        if(result){
          this.matDialogRef.close(true);
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
      this._inventotyDefinationService.UpdateCategory(this.category).subscribe(response=>{
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
  clearCategory(){
    this.category.Id=null;
    this.category.CategoryId=null;
    this.category.CategoryName=null;
    this.categoryForm.reset();
  }
}
