import { Component, OnInit,Inject } from '@angular/core';
import { AccountDefinationService } from '../../../services/master-settings/account-defination.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { PostLoginService } from '../../../services/common/post-login.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { Subledger } from '../../../models/master-settings/account-defination/subledger.model';
import { UserFormControl } from '../../../models/common/user-form-control.model';
import { DialogData } from '../../../models/common/dialog-data.model';

@Component({
  selector: 'app-add-subledger',
  templateUrl: './add-subledger.component.html',
  styleUrls: ['./add-subledger.component.css']
})
export class AddSubledgerComponent implements OnInit {
  DataList:any[]=[];
  ColumnList:any[]=[];
  userControlList:UserFormControl[]=[];
  sublederList:Subledger[]=[];
  constructor(private _accountService:AccountDefinationService,
    private _alertBox:AlertBoxService,
    private _postLoginService:PostLoginService,   
    public dialogRef:MatDialogRef<AddSubledgerComponent>,
    @Inject(MAT_DIALOG_DATA) public subledger: Subledger
  ) {}

  ngOnInit() {
      this.geSubledgerList();
      this.getUserFormControlByFormName();
  }
  getUserFormControlByFormName(){
    this._postLoginService.getUserFormControlByFormName('subledger').subscribe(response=>{
      this.userControlList=response.json();
      this.ColumnList=this.userControlList
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  geSubledgerList(){
    this._accountService.GetSublederList(this.subledger.AccountId).subscribe(response=>{
      this.sublederList=response.json();
      this.DataList=this.sublederList
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
        let result=response.json();
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Subleder created succesfully";
          this._alertBox.openDialog(dialogData);
          this.geSubledgerList();     
        }
      },error=>{
        let message=error.json();
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this._accountService.UpdateSubleder(this.subledger.Id,this.subledger).subscribe(response=>{
        let result=response.json();
        if(result){
          let dialogData=new DialogData();
          dialogData.message="Subleder created succesfully";
          this._alertBox.openDialog(dialogData);
          this.geSubledgerList();     
        }
      },error=>{
        let message=error.json();
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }

  }
  getSubledgerDetailsById($event:string){
    this._accountService.GetSublederById($event).subscribe(response=>{
      this.subledger=response.json();
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
      this._alertBox.openDialog(dialogData);
    })
  }
  deleteSubledger($event){
    this._accountService.DeleteGetSublederById($event).subscribe(response=>{
      let result=response.json();
      if(result){
        let dialogData=new DialogData();
        dialogData.message="Subleder deleted succesfully";
        this._alertBox.openDialog(dialogData);
        this.geSubledgerList();    
      }
    },error=>{
      let message=error.json();
      let dialogData=new DialogData();
      dialogData.message=message.Message;
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
