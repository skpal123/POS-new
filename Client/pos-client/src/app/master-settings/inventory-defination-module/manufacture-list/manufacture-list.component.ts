import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Manufacture } from '../../../models/master-settings/inventory-defination/manufacture.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { ManufactureEntryComponent } from '../manufacture-entry/manufacture-entry.component';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';

@Component({
  selector: 'app-manufacture-list',
  templateUrl: './manufacture-list.component.html',
  styleUrls: ['./manufacture-list.component.css']
})
export class ManufactureListComponent implements OnInit {
  reload:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  manufactureList:Manufacture[]=[];
  manufacture:Manufacture={Id:null,ManufactureId:null,ManufactureName:null,Address:null,Country_Id:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getManufactureList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginservice.getUserFormControlByFormName('manufacture-list').subscribe(response=>{
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getManufactureList(){
    this._inventotyDefinationService.getManufactureList().subscribe(response=>{
      this.manufactureList=response.json();
      this.DataList=this.manufactureList
      this.reload=true;
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getManufactureDetails($event:string){
    debugger
    this._inventotyDefinationService.getManufactureById($event).subscribe(response=>{
      this.manufacture=response.json();
      const dialogRef=this.matDialog.open(ManufactureEntryComponent,{
        data:this.manufacture,
        disableClose:true,
        height:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getManufactureList();
        }
      })
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteManufacture($event:string){
    this._inventotyDefinationService.deleteManufacture($event).subscribe(response=>{
      let result=response.json();
      if(result){
        this.getManufactureList();
        let dialogData=new DialogData();
        dialogData.message="Manufacture deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewManufacture(){
   this.clearManufacture();
    const dialogRef=this.matDialog.open(ManufactureEntryComponent,{
      data:this.manufacture,
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getManufactureList();
      }
    })
  }
  clearManufacture(){
    this.manufacture.Id=null;
    this.manufacture.ManufactureId=null;
    this.manufacture.ManufactureName=null;
    this.manufacture.Address=null;
    this.manufacture.Country_Id=null;
  }
  createMaufactureForm(){
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"manufacture",
      disableClose:true,
      //height:window.screen.height*.6+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getManufactureList();
      }
    })
  }
}
