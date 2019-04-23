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
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-manufacture-list',
  templateUrl: './manufacture-list.component.html',
  styleUrls: ['./manufacture-list.component.css']
})
export class ManufactureListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  manufactureList:Manufacture[]=[];
  manufacture:Manufacture={Id:null,ManufactureId:null,ManufactureName:null,Address:null,Country_Id:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _customDatatableService:CustomDatatableService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getManufactureList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._postLoginservice.getUserFormControlByFormName('manufacture-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response
      this.ColumnList=this.userControlList;
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getManufactureList(){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getManufactureList().subscribe(response=>{
      this.blockUi.stop();
      this.manufactureList=response
      this.DataList=this.manufactureList;
      this._customDatatableService.DataList=this.manufactureList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      this.blockUi.stop();
      let message=error
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getManufactureDetails($event:string){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getManufactureById($event).subscribe(response=>{
      this.blockUi.stop();
      this.manufacture=response
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
      this.blockUi.stop();
      let message=error
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteManufacture($event:string){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.deleteManufacture($event).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getManufactureList();
        let dialogData=new DialogData();
        dialogData.message="Manufacture deleted succesfully";
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
