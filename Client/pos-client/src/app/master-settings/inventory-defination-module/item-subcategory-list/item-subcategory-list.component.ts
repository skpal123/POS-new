import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Subcategory } from '../../../models/master-settings/inventory-defination/subcategory.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { PostLoginService } from '../../../services/common/post-login.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AddSubcategoryComponent } from '../add-subcategory/add-subcategory.component';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';

@Component({
  selector: 'app-item-subcategory-list',
  templateUrl: './item-subcategory-list.component.html',
  styleUrls: ['./item-subcategory-list.component.css']
})
export class ItemSubcategoryListComponent implements OnInit {

  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  subcategoryList:Subcategory[]=[];
  subcategory:Subcategory={Id:null,Category_Id:null,CategoryName:null,SubCategoryId:null,SubCategoryName:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getSubCategoryList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginservice.getUserFormControlByFormName('subcategory-list').subscribe(response=>{
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getSubCategoryList(){
    this._inventotyDefinationService.getSubCategoryList().subscribe(response=>{
      this.subcategoryList=response.json();
      this.DataList=this.subcategoryList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getSubCategoryDetails($event:string){
    debugger
    this._inventotyDefinationService.getSubCategoryById($event).subscribe(response=>{
      this.subcategory=response.json();
      const dialogRef=this.matDialog.open(AddSubcategoryComponent,{
        data:this.subcategory,
        disableClose:true,
        height:window.screen.height*.6+'px', 
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getSubCategoryList();
        }
      })
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSubCategory($event:string){
    this._inventotyDefinationService.deleteSubCategory($event).subscribe(response=>{
      let result=response.json();
      if(result){
        this.getSubCategoryList();
        let dialogData=new DialogData();
        dialogData.message="Category deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewSubCategory(){
   this.clearSubCategory();
    const dialogRef=this.matDialog.open(AddSubcategoryComponent,{
      data:this.subcategory,
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getSubCategoryList();
      }
    })
  }
  clearSubCategory(){
    this.subcategory.Id=null;
    this.subcategory.SubCategoryId=null;
    this.subcategory.CategoryName=null;
    this.subcategory.SubCategoryName=null;
    this.subcategory.SubCategoryId=null;
  }

}
