import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SettingSellprice } from '../../../models/master-settings/inventory-defination/setting-sell-price.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-setting-price',
  templateUrl: './setting-price.component.html',
  styleUrls: ['./setting-price.component.css']
})
export class SettingPriceComponent implements OnInit {
  @ViewChild('sellPriceMethodControl') sellPriceMethodControl:FormControl;
  sellPriceMethod:string="1"
  reload:boolean=false;
  firstTime:boolean=true;
  @BlockUI() blockUI: NgBlockUI;
  settingSellPriceList:SettingSellprice[]=[];
  userControlList:UserFormControl[]=[];
  columnlist:any[]=[];
  DataList:SettingSellprice[]=[];
  oldSettingSellPriceList:SettingSellprice[]=[];
  constructor(private _inventoryDefinationService:InventoryDefinationServiceService,
  private _postLoginService:PostLoginService,
  private _alertBox:AlertBoxService) { }

  ngOnInit() {
    debugger
    this.getSettingSellPrice(this.sellPriceMethod);
    this.getUserFormControlByFormName();
    this.sellPriceMethodControl.valueChanges.subscribe(data=>{
      this.getSettingSellPrice(data)
    })
  }
  getSettingSellPrice(priceSettingMethod:string){
    this.blockUI.start("Loading,Please wait...")
    this._inventoryDefinationService.GetSettingSellPrice(priceSettingMethod).subscribe(response=>{
      this.settingSellPriceList=response
      this.settingSellPriceList.forEach(s=>{
        s.ProfitMargin=0;
      })
      this.oldSettingSellPriceList=JSON.parse(JSON.stringify(this.settingSellPriceList));
      this.DataList= this.settingSellPriceList;
      this.reload=true;
      this.blockUI.stop();
    },
  error=>{
    this.blockUI.stop();
    let dialogData=new DialogData();
    dialogData.message=error
    this._alertBox.openDialog(dialogData);
  })
  }
  getUserFormControlByFormName(){
    this.blockUI.start("Loading,Please wait...");
    this._postLoginService.getUserFormControlByFormName('setting-sell-price').subscribe(response=>{
      this.blockUI.stop();
      this.userControlList=response
      this.columnlist=this.userControlList.filter(control=>control.Type!='none');
    },error=>{
      this.blockUI.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getDataList(){

  }
  GetColumnValueClicked($event:{name:string,value:number,index:number}){
    debugger
    if($event.name.toLowerCase()=='profitmargin'){
      this.addProfitMargin($event)
    }
    else if($event.name.toLowerCase()=='amount'){
      this.oldSettingSellPriceList[$event.index].Amount=$event.value;
      this.addProfitMargin($event)
    }
  }
  addProfitMargin(event:{name:string,value:number,index:number}){
    this.settingSellPriceList=JSON.parse(JSON.stringify(this.oldSettingSellPriceList));
    if(this.oldSettingSellPriceList[event.index].Amount>0){
      let percentage=event.name.toLowerCase()=='profitmargin'?event.value:this.DataList[event.index].ProfitMargin
      this.DataList[event.index].Amount=this.oldSettingSellPriceList[event.index].Amount+(this.oldSettingSellPriceList[event.index].Amount*percentage)/100
    }
  }
  SaveSettingSellPrice(){
    this.blockUI.start("Loading,Please wait...");
    this._inventoryDefinationService.SaveSettingSellPrice(this.DataList).subscribe(response=>{
      this.blockUI.stop();
      let result=response
      if(result){
        let dialogData=new DialogData();
      dialogData.message="Save successfully";
      this._alertBox.openDialog(dialogData);
      }
    },error=>{
      this.blockUI.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSettingSellPriceDetailsRow($event){
    
  }
}
