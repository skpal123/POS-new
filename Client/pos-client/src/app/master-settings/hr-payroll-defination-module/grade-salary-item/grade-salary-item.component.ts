import { Component, OnInit ,Inject} from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { SalaryItem } from '../../../models/master-settings/hr-payroll/salary-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { GradeSubGradeSalItemDetails } from '../../../models/master-settings/hr-payroll/grade-subgrade-salitem-details.model';
import { DatatableTextOutput } from '../../../models/common/datatable-text-click.model';
import { BuildFormulaComponent } from '../build-formula/build-formula.component';
import { GradeSubGradeSalItem } from '../../../models/master-settings/hr-payroll/grade-subgrade-salitem.model';

@Component({
  selector: 'app-grade-salary-item',
  templateUrl: './grade-salary-item.component.html',
  styleUrls: ['./grade-salary-item.component.css']
})
export class GradeSalaryItemComponent implements OnInit {
  IsSaveButtonClick:boolean=false;
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  salaryItemList:SalaryItem[]=[];
  salaryItem:SalaryItem={InheritedItem:null,InheritedItemName:null,Percentage:null,OperatorString:null}
  autoCompleteData=[];
  constructor(private _alertBox:AlertBoxService,
    private _commonService:CommonService,
    private _customDatatableService:CustomDatatableService,
    private matDialog:MatDialog,
    private _hrPayrollDefinationService:HrPayrollDefinationServiceService,
    public matDialogRef:MatDialogRef<GradeSalaryItemComponent>,
  @Inject(MAT_DIALOG_DATA) public gradeSubGradeSalItemDetails:GradeSubGradeSalItemDetails
  ) { }
  ngOnInit() {
    debugger
    this.getDataList();
    this.getSalaryItemList();
    this.getUserFormControlByFormName();
  }
  onNoClick():void{
    this.matDialogRef.close(this.IsSaveButtonClick);
  }
  getSalaryItemList(){
    this._hrPayrollDefinationService.getSalaryItemList().subscribe(response=>{
      this.salaryItemList=response
      this.salaryItemList.forEach((sal,index,array)=>{
        this.autoCompleteData.push(sal.ItemId+"-"+sal.ItemName)
      })     
    },
  error=>{
    let dialogData=new DialogData();
    dialogData.message=error
    this._alertBox.openDialog(dialogData);
  })
  }
  getDataList(){
    this.DataList=this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList;
  }
  ParentAutoCompleteDataSource($event:string){
    debugger
    console.log($event)
  }
  deleteVoucherDetailsRow(index:number){

  }
  getUserFormControlByFormName(){
    this._commonService.getUserFormControlByFormName('grade-sub-grade-salayitem-list').subscribe(response=>{
      this.userControlList=response;
      this.ColumnList=this.userControlList;
      this._customDatatableService.ColumnList=this.userControlList;
      this.columnReady=true;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  GetDatatableColumnTextClicked($event:DatatableTextOutput){
    if($event.ColumnName=="BuildFormula"){
      //this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList=[];
      //this.addNewRow()
      const dialog=this.matDialog.open(BuildFormulaComponent,{
        data:this.salaryItem,
        disableClose:true,
        height:'auto',
        maxHeight:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialog.afterClosed().subscribe((result:SalaryItem)=>{
        debugger
        this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].BuildFormula=result.OperatorString;
        //this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].SalaryItemName=result.InheritedItemName;
        //this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[$event.Index].Amount=10
        console.log(this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList[0]);
      })
    }
  }
  addNewRow(){
    var gradeSubGradeSalItem=new GradeSubGradeSalItem()
    gradeSubGradeSalItem.SalaryItemName=null;
    gradeSubGradeSalItem.Amount=0;
    gradeSubGradeSalItem.BuildFormula=null;
    this.gradeSubGradeSalItemDetails.GradeSubGradeSalItemList.push(gradeSubGradeSalItem);
  }
}
