import { Component, OnInit, Input ,Output,EventEmitter, OnChanges} from '@angular/core';
import { SelectDropdown } from '../../models/common/select.dropdown.model';
import { MultiSelectDropdown } from '../../models/common/multiselect.dropdown.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DropdownService } from '../../services/common/dropdown.service';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-item-dropdown',
  templateUrl: './item-dropdown.component.html',
  styleUrls: ['./item-dropdown.component.css']
})
export class ItemDropdownComponent implements OnChanges {

  itemList:SelectDropdown[]=[]
  @Input() subCategoryId:string
  @Input() subledgerSelectedItems:any=[];
  @Output() subledgerOnItemSelect:EventEmitter <any>=new EventEmitter <any>();
  @Output() subledgerOnItemDeSelect:EventEmitter <any>=new EventEmitter <any>();

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
  constructor(private _alertBox:AlertBoxService,
    private _dropdownService:DropdownService,
  ) { }

  ngOnChanges(){
    debugger
    if(this.subCategoryId!=null && this.subCategoryId!="0"){
      this.getItemList(this.subCategoryId);
    }else if(this.subCategoryId==null){
      this.getItemList("00000000-0000-0000-0000-000000000000")

    }
  }
  getItemList(subCategoryId:string){
    this.itemDropdownList=[];
    this.subledgerSelectedItems=[];
    this._dropdownService.getItemDropdownList(subCategoryId).subscribe(response=>{
      this.itemList=response.json();
      if(this.itemList.length>0){
        this.itemList.forEach((a,index,array)=>{
          this.itemDropdownList.push({id:a.Value,itemName:a.Code+'-'+a.Text});
        })
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  subledgerOnItemSelect1($event:MultiSelectDropdown){
    debugger
    this.subledgerOnItemSelect.emit($event)
  }
  subledgerOnItemDeSelect1($event){ 
    debugger
    this.subledgerOnItemSelect.emit($event)
  }

}
