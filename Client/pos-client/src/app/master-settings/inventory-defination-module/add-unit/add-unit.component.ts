import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Unit } from '../../../models/master-settings/inventory-defination/unit.model';
import { NgForm } from '@angular/forms';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {
  @ViewChild('unitForm') unitForm:NgForm
  constructor(public matDialogRef:MatDialogRef<AddUnitComponent>,
  @Inject(MAT_DIALOG_DATA) public unit:Unit,
  private _alertBox:AlertBoxService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    this.unitForm.control.markAsDirty();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  saveUnit(){
    if(this.unit.Id==null){
      this._inventotyDefinationService.CreateUnit(this.unit).subscribe(response=>{
        let result=response
        if(result){
          this.matDialogRef.close(response);
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._inventotyDefinationService.UpdateUnit(this.unit).subscribe(response=>{
        let result=response
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
  }
  clearUnit(){
    this.unit.Id=null;
    this.unit.UnitName=null;
    this.unit.Description=null;
    this.unitForm.reset();
  }
}
