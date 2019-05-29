import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { MultiSelectDropdown } from '../../../models/common/multiselect.dropdown.model';
import { OfferSetupValidation } from '../../../models/validation/inventory/offer-setup-validation.model';
import { NgForm } from '@angular/forms';
import { OfferSetup } from '../../../models/master-settings/inventory-defination/offer-setup.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ValidationService } from '../../../services/common/validation.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { NewDropdownDataService } from '../../../common-module/new-dropdown-data.service';
import { DropdownService } from '../../../services/common/dropdown.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { DialogData } from '../../../models/common/dialog-data.model';

@Component({
  selector: 'app-offer-entry',
  templateUrl: './offer-entry.component.html',
  styleUrls: ['./offer-entry.component.css']
})
export class OfferEntryComponent implements OnInit {
  offerSetupValidation:OfferSetupValidation[]=[];
  @ViewChild('offerSetupForm') offerSetupForm:NgForm
  itemName:string="offerId";
  formName:string="offerSetup-entry";
  itemNew:boolean=false;
  subCategoryId:string=null;
  singleSelection:boolean=true
  itemSelectedItems :MultiSelectDropdown[]= [
  ];
  itemDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];
  itemDropdownSettings = {
    singleSelection: true,
    text: "Select item",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    showCheckbox:true
    
  };
  constructor(public matDialogRef:MatDialogRef<OfferEntryComponent>,
    private _validationService:ValidationService,
  @Inject(MAT_DIALOG_DATA) public offerSetup:OfferSetup,
  private _alertBox:AlertBoxService,
  private matDialog:MatDialog,
  private _dropdownService:DropdownService,
  private _inventotyDefinationService:InventoryDefinationServiceService,
) { }

  ngOnInit() {
    debugger
    if(this.offerSetup.Id==null){
      this.itemSelectedItems.push({id:"0",itemName:"SELECT"});
    }
    else{
    }
    this.getItemFormInfo();
  }
  onNoClick(){
    this.matDialogRef.close(false);
  }
  saveItem(){
    debugger
    if(this.offerSetup.Id==null){
      this._inventotyDefinationService.CreateOfferSetup(this.offerSetup).subscribe(response=>{
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
      this._inventotyDefinationService.UpdateOfferSetup(this.offerSetup).subscribe(response=>{
        let result=response
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
  
   getItemFormInfo(){
    // this._validationService.getItemValidationData().subscribe((response:InventoryItemValidation[])=>{
    //   this.itemValidation=response
    // },error=>{
    //   let message=error;
    //   let dialogData=new DialogData();
    //   dialogData.message=message.Message;
    //   this._alertBox.openDialog(dialogData);
    // })
  }
  parentGetGeneratedCode($event:string){
    debugger
    this.offerSetup.OfferId=$event;
  }
}
