import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { InventoryLocation } from '../../../models/master-settings/inventory-defination/inventory-location.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';

@Component({
  selector: 'app-location-entry',
  templateUrl: './location-entry.component.html',
  styleUrls: ['./location-entry.component.css']
})
export class LocationEntryComponent implements OnInit {
  @ViewChild('locationForm') locationForm:NgForm
  constructor(public matDialogRef:MatDialogRef<LocationEntryComponent>,
  @Inject(MAT_DIALOG_DATA) public location:InventoryLocation,
  private _alertBox:AlertBoxService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

ngOnInit() {

}
onNoClick(){
  this.matDialogRef.close(false);
}
saveLocation(){
  if(this.location.Id==null){
    this._inventotyDefinationService.CreateLocation(this.location).subscribe(response=>{
      let result=response.json();
      if(result){
        this.matDialogRef.close(true);
        let dialogData=new DialogData();
        dialogData.message="Save successfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  else{
    this._inventotyDefinationService.UpdateLocation(this.location).subscribe(response=>{
      let result=response.json();
      if(result){
        this.matDialogRef.close(true);
        let dialogData=new DialogData();
        dialogData.message="Update successfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
}

}
