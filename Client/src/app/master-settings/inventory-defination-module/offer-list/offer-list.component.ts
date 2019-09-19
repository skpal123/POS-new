import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { OfferSetup } from '../../../models/master-settings/inventory-defination/offer-setup.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { CommonService } from '../../../services/common/common.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { OfferEntryComponent } from '../offer-entry/offer-entry.component';
import { DatatableButtonOutput } from '../../../models/common/datatable-button-output';
import { NavigationDataService } from '../../../services/common/navigation-data.service';
@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  offerSetupList:OfferSetup[]=[];
  offerSetup:OfferSetup={Id:null,OfferId:null,OfferName:null,DiscountRate:0,IsSingle:false,OfferType:"single",
    Product_Id:null,FreeProduct_Id:null,ProductName:null,FreeProductList:null,ViewFreeProduct:null,
    ProductList:[],IsOneToMany:false,IsManyToOne:false
  }
  constructor(private _alertBox:AlertBoxService,
    private _commonService:CommonService,
    private _navigationData:NavigationDataService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getOfferSetupList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this.blockUi.start("Loading....,Please wait.")
    this._commonService.getUserFormControlByFormName('offer-setup-list').subscribe(response=>{
      this.blockUi.stop();
      this.userControlList=response;
      this.ColumnList=this.userControlList
      this.columnReady=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getOfferSetupList(){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getOfferSetupList().subscribe(response=>{
      this.blockUi.stop();
      this.offerSetupList=response
      this.offerSetupList.forEach(a=>{
        a.ViewFreeProduct="View product list"
      })
      this.DataList=this.offerSetupList
      this.dataReady=true;
      this.reload=true;
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  getOfferSetUpDetails($event:OfferSetup){
    debugger
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.getOfferSetupById($event.OfferId).subscribe(response=>{
      this.blockUi.stop();
      this.offerSetup=response
      this._navigationData.IsUpdate=true;
      this._navigationData.PreviousData=this.offerSetup.OfferId;
      this.offerSetup.IsSingle?this.offerSetup.OfferType="single":this.offerSetup.OfferType="multiple"
      const dialogRef=this.matDialog.open(OfferEntryComponent,{
        data:this.offerSetup,
        disableClose:true,
        height:'auto',
        maxHeight:window.screen.height*.6+'px',
        width:window.screen.width*.4+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getOfferSetupList();
        }
      })
    },error=>{
      this.blockUi.stop();
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteOfferSetup($event:OfferSetup){
    this.blockUi.start("Loading....,Please wait.")
    this._inventotyDefinationService.deleteOfferSetup($event.OfferId).subscribe(response=>{
      this.blockUi.stop();
      let result=response
      if(result){
        this.getOfferSetupList();
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
  createNewOfferSetup(){
   this.clearOfferSetup();
    const dialogRef=this.matDialog.open(OfferEntryComponent,{
      data:this.offerSetup,
      disableClose:true,
      height:'auto',
      maxHeight:window.screen.height*.6+'px',
      width:window.screen.width*.4+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getOfferSetupList();
      }
    })
  }
  customButtonClick($event:DatatableButtonOutput){
    if($event.ColumnName="ViewFreeProduct"){
      alert("tttt")
    }
  }
  clearOfferSetup(){
    this.offerSetup.Id=null;
    this.offerSetup.OfferId=null;
    this.offerSetup.OfferName=null;
    this.offerSetup.IsSingle=true;
    this.offerSetup.BundleSize=null;
    this.offerSetup.IsOneToMany=false;
    this.offerSetup.OfferType="single";
    this.offerSetup.FreeProductList=[];
    this.offerSetup.ProductList=[];
    this.offerSetup.DiscountRate=0;
  }
}
