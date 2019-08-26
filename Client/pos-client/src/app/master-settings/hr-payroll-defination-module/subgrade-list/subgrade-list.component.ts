import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { SubGrade } from '../../../models/master-settings/hr-payroll/sub-grade.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { SubgradeComponent } from '../subgrade/subgrade.component';
import { CustomDatatableControlComponent } from '../../../common-module/custom-datatable-control/custom-datatable-control.component';
import { DatatableButtonOutput } from '../../../models/common/datatable-button-output';
import { GradeSubGradeSalItemDetails } from '../../../models/master-settings/hr-payroll/grade-subgrade-salitem-details.model';
import { GradeSalaryItemComponent } from '../grade-salary-item/grade-salary-item.component';

@Component({
  selector: 'app-subgrade-list',
  templateUrl: './subgrade-list.component.html',
  styleUrls: ['./subgrade-list.component.css']
})
export class SubgradeListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  subgradeList:SubGrade[]=[];
  subgrade:SubGrade={Id:null,SubGradeId:null,SubGradeName:null,GradeName:null,Grade_Id:null,EeectiveDate:null}
  gradeSubGradeSalItemDetails:GradeSubGradeSalItemDetails={ 
    Grade_Id:null,SubGrade_Id:null,GradeName:null,SubGradeName:null,GradeSubGradeSalItemList:[]
  }
  constructor(private _alertBox:AlertBoxService,
    private _commonService:CommonService,
    private _customDatatableService:CustomDatatableService,
    private _hrPayrollDefinationService:HrPayrollDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getSubgradeList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('subgrade-list').subscribe(response=>{
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
  getSubgradeList(){
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.getSubGradeList().subscribe(response=>{
      this.blockUi.stop();
      this.subgradeList=response
      this.subgradeList.forEach(a=>{
        a.SubGradeSalaryItem="Add sub grade salary item"
      })
      this.DataList=this.subgradeList;
      this._customDatatableService.DataList=this.subgradeList;
      this.reload=true;
      this.dataReady=true;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getSubgradeDetails($event:SubGrade){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.getSubGradeById($event.Id).subscribe(response=>{
      this.blockUi.stop();
      this.subgrade=response
      const dialogRef=this.matDialog.open(SubgradeComponent,{
        data:this.subgrade,
        disableClose:true,
        height:'auto', 
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getSubgradeList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSubgrade($event:SubGrade){
    this.blockUi.start("Loading....,Please wait.")
    this._hrPayrollDefinationService.DeleteSubGrade($event.Id).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getSubgradeList();
        let dialogData=new DialogData();
        dialogData.message="Category deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewSubgrade(){
   this.clearSubgrade();
    const dialogRef=this.matDialog.open(SubgradeComponent,{
      data:this.subgrade,
      disableClose:true,
      height:'auto',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getSubgradeList();
      }
    })
  }
  clearSubgrade(){
    this.subgrade.Id=null;
    this.subgrade.SubGradeId=null;
    this.subgrade.SubGradeName=null;
    this.subgrade.Grade_Id=null;
    this.subgrade.EeectiveDate=null;
  }
  getDatatableControl(){
    // this.columnChange=false;
     const dialogRef=this.matDialog.open(CustomDatatableControlComponent,{
       data:this.userControlList,
       disableClose:true,
       height:'auto',
       maxHeight:window.screen.height*.9+'px',
       width:window.screen.width*.8+'px'
     });
     dialogRef.afterClosed().subscribe(result=>{
      if(result){
       // this.columnChange=true;
      }
     })
   }
   customButtonClicked($event:DatatableButtonOutput){
    debugger
    this.subgrade=$event.RowData;
    if($event.ColumnName=="SubGradeSalaryItem"){
      this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList=[];
      this.gradeSubGradeSalItemDetails.Grade_Id=this.subgrade.Id
      this.gradeSubGradeSalItemDetails.GradeName=this.subgrade.GradeName;
      this.gradeSubGradeSalItemDetails.SubGradeName=this.subgrade.SubGradeName
      this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList.push({
        SalaryItemName:null,Amount:0,BuildFormula:null
      })
      const dialogRef=this.matDialog.open(GradeSalaryItemComponent,{
        data:this.gradeSubGradeSalItemDetails,
        disableClose:true,
        maxWidth:'100vw',
        maxHeight:'100vh',
        height:'auto',
        width:'50%'
      });
      dialogRef.afterClosed().subscribe(result=>{
        
      })
    }
  }
}
