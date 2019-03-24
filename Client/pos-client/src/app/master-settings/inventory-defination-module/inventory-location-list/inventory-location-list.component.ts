import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { InventoryLocation } from '../../../models/master-settings/inventory-defination/inventory-location.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { LocationEntryComponent } from '../location-entry/location-entry.component';

@Component({
  selector: 'app-inventory-location-list',
  templateUrl: './inventory-location-list.component.html',
  styleUrls: ['./inventory-location-list.component.css']
})
export class InventoryLocationListComponent implements OnInit {
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  locationList:InventoryLocation[]=[];
  location:InventoryLocation={Id:null,LocationId:null,Description:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }

  ngOnInit() {
    this.getLocaionList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginservice.getUserFormControlByFormName('location-list').subscribe(response=>{
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getLocaionList(){
    this._inventotyDefinationService.getLocationList().subscribe(response=>{
      this.locationList=response.json();
      this.DataList=this.locationList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getLocationDetails($event:string){
    debugger
    this._inventotyDefinationService.getLocationById($event).subscribe(response=>{
      this.location=response.json();
      const dialogRef=this.matDialog.open(LocationEntryComponent,{
        data:this.location,
        disableClose:true,
        height:'auto',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getLocaionList();
        }
      })
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteLocation($event:string){
    this._inventotyDefinationService.deleteLocation($event).subscribe(response=>{
      let result=response.json();
      if(result){
        this.getLocaionList();
        let dialogData=new DialogData();
        dialogData.message="Location deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewUnit(){
   this.clearUnit();
    const dialogRef=this.matDialog.open(LocationEntryComponent,{
      data:this.location,
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getLocaionList();
      }
    })
  }
  clearUnit(){
    this.location.Id=null;
    this.location.LocationId=null;
    this.location.LocationName=null;
    this.location.Description=null;
  }
}
