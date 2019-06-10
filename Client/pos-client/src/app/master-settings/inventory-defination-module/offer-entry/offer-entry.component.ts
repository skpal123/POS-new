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
import { SelectDropdown } from '../../../models/common/select.dropdown.model';

@Component({
  selector: 'app-offer-entry',
  templateUrl: './offer-entry.component.html',
  styleUrls: ['./offer-entry.component.css']
})
export class OfferEntryComponent implements OnInit {
  offerSetupValidation:OfferSetupValidation[]=[];
  @ViewChild('offerSetupForm') offerSetupForm:NgForm;
  itemList:SelectDropdown[]=[]
  itemName:string="offerId";
  formName:string="offerSetup-entry";
  itemNew:boolean=false;
  subCategoryId:string=null;
  showItem:boolean=true
  itemSelectedItems :MultiSelectDropdown[]= [
  ];
  freeItemSelectedItems:MultiSelectDropdown[]= [
    { id: "0", itemName: "Select" }
  ];
  itemDropdownList: MultiSelectDropdown[] = [
    { id: "0", itemName: "Select" }
  ];

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
    $(document).ready(function(){
      $('#outDiv').click(function(e){
      
      })
    })
    if(this.offerSetup.Id==null){
      this.itemSelectedItems.push({id:"0",itemName:"SELECT"});
    }
    else{
    }
    this.getItemList(null);
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
  getItemList(subCategoryId:string){
    this._dropdownService.getItemDropdownList(subCategoryId).subscribe(response=>{
      this.itemList=response
      if(this.itemList.length>0){
        this.itemList.forEach((a,index,array)=>{
          this.itemDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
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
  getSelectedItemParent($event:MultiSelectDropdown[]){

  }
  showItemValueParent($event:boolean){
    debugger
    this.showItem=$event
  }
  clickOutsideOfMultiselect(){
    debugger
    this.showItem=true;
  }
}
