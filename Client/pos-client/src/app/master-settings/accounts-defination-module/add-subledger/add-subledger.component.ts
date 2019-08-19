import { Component, OnInit,Inject } from '@angular/core';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { Subledger } from '../../../models/master-settings/account-defination/subledger.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { DialogData } from '../../../models/common/dialog-data.model';
import { CustomDatatableService } from '../../../services/common/custom-datatable.service';

@Component({
  selector: 'app-add-subledger',
  templateUrl: './add-subledger.component.html',
  styleUrls: ['./add-subledger.component.css']
})
export class AddSubledgerComponent implements OnInit {
  reload:boolean=false;
  columnReady:boolean=false;
  dataReady:boolean=false;
  DataList:any[]=[];
  ColumnList:any[]=[];
  userControlList:UserFormControl[]=[];
  sublederList:Subledger[]=[];
  constructor(private _accountService:AccountDefinationService,
    private _alertBox:AlertBoxService,
    private _postLoginService:PostLoginService,
    private _customDatataTableService:CustomDatatableService , 
    public dialogRef:MatDialogRef<AddSubledgerComponent>,
    @Inject(MAT_DIALOG_DATA) public subledger: Subledger
  ) {}

  ngOnInit() {
    debugger
      this.geSubledgerList();
      this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginService.getUserFormControlByFormName('subledger').subscribe(response=>{
      this.userControlList=response
      this.ColumnList=this.userControlList;
      this.columnReady=true;
      this._customDatataTableService.ColumnList=this.userControlList;
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  geSubledgerList(){
    debugger
    this._accountService.GetSublederList(this.subledger.AccountId).subscribe(response=>{
      this.sublederList=response
      this.DataList=this.sublederList;
      this.dataReady=true;
      this.reload=true;
      this._customDatataTableService.DataList=this.sublederList;
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  addSubledger(){
    debugger
    if(this.subledger.Id==null){
      this._accountService.AddSubleder(this.subledger).subscribe(response=>{
        let result=response;
        this.clear();
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Subleder created succesfully";
          this._alertBox.openDialog(dialogData);
          this.geSubledgerList();     
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._accountService.UpdateSubleder(this.subledger.Id,this.subledger).subscribe(response=>{
        let result=response
        this.clear();
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Subleder created succesfully";
          this._alertBox.openDialog(dialogData);
          this.geSubledgerList();     
        }
      },error=>{
        let dialogData=new DialogData();
        dialogData.message=error
        this._alertBox.openDialog(dialogData);
      })
    }

  }
  getSubledgerDetailsById($event:Subledger){
    debugger
    this._accountService.GetSublederById($event.Id).subscribe(response=>{
      this.subledger=response
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSubledger($event:Subledger){
    this._accountService.DeleteGetSublederById($event.Id).subscribe(response=>{
      let result=response
      if(result){
        let dialogData=new DialogData();
        dialogData.message="Subleder deleted succesfully";
        this._alertBox.openDialog(dialogData);
        this.geSubledgerList();    
      }
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  onNoClick():void{
    this.dialogRef.close();
  }
  clear(){
    this.subledger.Id=null,
    this.subledger.Description=null;
    this.subledger.SublederCode=null;
  }
}
