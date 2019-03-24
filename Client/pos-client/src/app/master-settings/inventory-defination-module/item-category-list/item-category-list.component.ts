import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Category } from '../../../models/master-settings/inventory-defination/category.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-item-category-list',
  templateUrl: './item-category-list.component.html',
  styleUrls: ['./item-category-list.component.css']
})
export class ItemCategoryListComponent implements OnInit {

  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  categoryList:Category[]=[];
  category:Category={Id:null,CategoryId:null,CategoryName:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getCategoryList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginservice.getUserFormControlByFormName('category-list').subscribe(response=>{
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getCategoryList(){
    this._inventotyDefinationService.getCategoryList().subscribe(response=>{
      this.categoryList=response.json();
      this.DataList=this.categoryList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getCategoryDetails($event:string){
    debugger
    this._inventotyDefinationService.getCategoryById($event).subscribe(response=>{
      this.category=response.json();
      const dialogRef=this.matDialog.open(AddCategoryComponent,{
        data:this.category,
        disableClose:true,
        height:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getCategoryList();
        }
      })
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteCategory($event:string){
    this._inventotyDefinationService.deleteUnit($event).subscribe(response=>{
      let result=response.json();
      if(result){
        this.getCategoryList();
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
  createNewCategory(){
   this.clearCategory();
    const dialogRef=this.matDialog.open(AddCategoryComponent,{
      data:this.category,
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getCategoryList();
      }
    })
  }
  clearCategory(){
    this.category.Id=null;
    this.category.CategoryId=null;
    this.category.CategoryName=null;
  }
}
