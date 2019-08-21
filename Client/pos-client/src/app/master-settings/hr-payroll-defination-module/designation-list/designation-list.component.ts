import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Designation } from '../../../models/master-settings/hr-payroll/designation.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { GradeComponent } from '../grade/grade.component';
import { DesignationComponent } from '../designation/designation.component';
@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.css']
})
export class DesignationListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  designationList:Designation[]=[];
  designation:Designation={Id:null,DesignationId:null,DesignationName:null,Description:null}
  constructor(private _alertBox:AlertBoxService,
    private _commonService:CommonService,
    private _customDatatableService:CustomDatatableService,
    private _hrPayrollDefinationService:HrPayrollDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getDesignationList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('designation-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response;
      this.ColumnList=this.userControlList
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getDesignationList(){
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.getDesignationList().subscribe(response=>{
      this.blockUi.stop();
      this.designationList=response
      this.DataList=this.designationList
      this._customDatatableService.DataList=this.designationList;
      this.dataReady=true;
      this.reload=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getDesignationDetails($event:Designation){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.getDesignationById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.designation=response
      const dialogRef=this.matDialog.open(DesignationComponent,{
        data:this.designation,
        disableClose:true,
        height:'auto',
        maxHeight:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getDesignationList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteDesignation($event:Designation){
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.DeleteDesignation($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getDesignationList();
        let dialogData=new DialogData();
        dialogData.message="Designation deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewDesignation(){
    debugger
   this.clearDesignation();
    const dialogRef=this.matDialog.open(DesignationComponent,{
      data:this.designation,
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getDesignationList();
      }
    })
  }
  clearDesignation(){
    this.designation.Id=null;
    this.designation.DesignationId=null;
    this.designation.DesignationName=null;
  }
}
