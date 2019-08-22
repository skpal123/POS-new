import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SalaryItemValidation } from '../../../models/validation/hr-payroll/salaryitem.validation.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SalaryItem } from '../../../models/master-settings/hr-payroll/salary-item.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
import { ValidationService } from '../../../services/common/validation.service';
import { HrPayrollDefinationServiceService } from '../../../services/master-settings/hr-payroll-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormDetailsControlComponent } from '../../../common-module/form-details-control/form-details-control.component';

@Component({
  selector: 'app-salary-item',
  templateUrl: './salary-item.component.html',
  styleUrls: ['./salary-item.component.css']
})
export class SalaryItemComponent implements OnInit {
  @ViewChild('salaryItemForm') salaryItemForm:NgForm
  salaryItemValidation:SalaryItemValidation[]=[]
  itemName:string="salaryItemId"
  constructor(public matDialogRef:MatDialogRef<SalaryItemComponent>,
  @Inject(MAT_DIALOG_DATA) public salaryItem:SalaryItem,
  private _alertBox:AlertBoxService,
  private _navigationData:NavigationDataService,
  private matDialog:MatDialog,
  private _validationService:ValidationService,
  private _hrpayrollDefinationService:HrPayrollDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.salaryItem.Id!=null){
      this.salaryItemForm.control.markAsDirty();
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  getItemFormInfo(){
    this._validationService.getSalaryItemValidationData().subscribe((response:SalaryItemValidation[])=>{
      this.salaryItemValidation=response
    },error=>{
      let dialogData=new DialogData(); 
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  saveSalaryItem(){
    debugger
    if(this.salaryItem.Id==null){
      this._hrpayrollDefinationService.CreateSalaryItem(this.salaryItem).subscribe(response=>{
        let result=response
        if(result){
          this._navigationData.IsSaved=true;
          this.matDialogRef.close(response);
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._hrpayrollDefinationService.UpdateSalaryItem(this.salaryItem).subscribe(response=>{
        let result=response
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  clearSalaryItem(){
    this.salaryItem.Id=null;
    this.salaryItem.ItemId=null;
    this.salaryItem.ItemType=null;
    this.salaryItem.ItemTypeName=null;
    this.salaryItem.IsBasic=false;
    this.salaryItem.IsDaily=false;
    this.salaryItem.IsDefault=false;
    this.salaryItem.IsLeave=false;
    this.salaryItem.IsLoan=false;
    this.salaryItem.IsPension=false;
    this.salaryItem.IsTax=false;
    this.salaryItem.DefaultAmount=0;
    this.salaryItemForm.reset();
  }
  controlGroupItemForm(){
    debugger
    const dialogRef=this.matDialog.open(FormDetailsControlComponent,{
      data:"salary-item-form",
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.9+'px',
      width:window.screen.width*.8+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
       //this.getItemPurchaseValidationList()
     }
    })
  }
  parentGetGeneratedCode($event:string){
    debugger
    this.salaryItem.ItemId=$event;
  }

}