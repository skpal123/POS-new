import { Component, OnInit, Inject } from '@angular/core';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { Unit } from '../../../models/master-settings/inventory-defination/unit.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { DialogData } from '../../../models/common/dialog-data.model';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css']
})
export class UnitListComponent implements OnInit {
  reload:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  unitList:Unit[]=[];
  unit:Unit={Id:null,UnitName:null,Description:null}
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getUnitList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginservice.getUserFormControlByFormName('unit-list').subscribe(response=>{
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getUnitList(){
    this._inventotyDefinationService.getUnitList().subscribe(response=>{
      this.unitList=response.json();
      this.DataList=this.unitList
      this.reload=true;
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getUnitDetails($event:string){
    debugger
    this._inventotyDefinationService.getUnitById($event).subscribe(response=>{
      this.unit=response.json();
      const dialogRef=this.matDialog.open(AddUnitComponent,{
        data:this.unit,
        disableClose:true,
        height:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getUnitList();
        }
      })
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteUnit($event:string){
    this._inventotyDefinationService.deleteUnit($event).subscribe(response=>{
      let result=response.json();
      if(result){
        this.getUnitList();
        let dialogData=new DialogData();
        dialogData.message="Unit deleted succesfully";
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
    const dialogRef=this.matDialog.open(AddUnitComponent,{
      data:this.unit,
      disableClose:true,
      height:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getUnitList();
      }
    })
  }
  clearUnit(){
    this.unit.Id=null;
    this.unit.UnitName=null;
    this.unit.Description=null;
  }
}
