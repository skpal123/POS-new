import { Component, OnInit } from '@angular/core';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { Party } from '../../../models/master-settings/inventory-defination/party.model';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { InventoryDefinationServiceService } from '../../../services/master-settings/inventory-defination-service.service';
import { MatDialog } from '@angular/material';
import { DialogData } from '../../../models/common/dialog-data.model';
import { PartyEntryComponent } from '../party-entry/party-entry.component';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css']
})
export class PartyListComponent implements OnInit {
  reload:boolean=false;
  userControlList:UserFormControl[]=[];
  ColumnList:any[]=[];
  DataList:any[]=[];
  partyList:Party[]=[];
  party:Party={
    Id:null,PartyId:null,PartyName:null,ContactPerson:null,PhoneNo:null,Email:null,
    Ledger_Id:null,SubLedger_Id:null,LedgerName:null,SubLedgerName:null,Address:null
  }
  constructor(private _alertBox:AlertBoxService,
    private _postLoginservice:PostLoginService,
    private _inventotyDefinationService:InventoryDefinationServiceService,
    private matDialog:MatDialog
  ) { }
  ngOnInit() {
    debugger
    this.getPartyList();
    this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginservice.getUserFormControlByFormName('party-list').subscribe(response=>{
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getPartyList(){
    this._inventotyDefinationService.getPartyList().subscribe(response=>{
      this.partyList=response.json();
      this.DataList=this.partyList
      this.reload=true;
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  getPartyDetails($event:string){
    debugger
    this._inventotyDefinationService.getPartyById($event).subscribe(response=>{
      this.party=response.json();
      const dialogRef=this.matDialog.open(PartyEntryComponent,{
        data:this.party,
        disableClose:true,
        height:window.screen.height*.95+'px', 
        width:window.screen.width*.5+'px'
      });
      dialogRef.afterClosed().subscribe(result=>{
        if(result){
          this.getPartyList();
        }
      })
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteParty($event:string){
    this._inventotyDefinationService.deleteParty($event).subscribe(response=>{
      let result=response.json();
      if(result){
        this.getPartyList();
        let dialogData=new DialogData();
        dialogData.message="Category deleted succesfully";
        this._alertBox.openDialog(dialogData);
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  createNewItem(){
   this.clearItem();
    const dialogRef=this.matDialog.open(PartyEntryComponent,{
      data:this.party,
      disableClose:true,
      height:window.screen.height*.95+'px',
      width:window.screen.width*.5+'px'
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.getPartyList();
      }
    })
  }
  clearItem(){
    this.party.Id=null;
    this.party.PartyId=null;
    this.party.PartyName=null;
    this.party.ContactPerson=null;
    this.party.PhoneNo=null;
    this.party.Email=null;
    this.party.Address=null;
    this.party.Ledger_Id=null;
    this.party.SubLedger_Id=null;
  }
}
