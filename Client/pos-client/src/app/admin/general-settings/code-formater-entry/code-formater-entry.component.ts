import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material';
import { CodeFormater } from '../../../models/admin/code-formater.model';
import { GeneralSettingsService } from '../../../services/admin/general-settings.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DialogData } from '../../../models/common/dialog-data.model';

@Component({
  selector: 'app-code-formater-entry',
  templateUrl: './code-formater-entry.component.html',
  styleUrls: ['./code-formater-entry.component.css']
})
export class CodeFormaterEntryComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  codeFormaterForm:FormGroup
  constructor(private fb:FormBuilder,
    public matDialogRef:MatDialogRef<CodeFormaterEntryComponent>,
    private _generalSettingService:GeneralSettingsService,
    private _alertBox:AlertBoxService,
    @Inject(MAT_DIALOG_DATA) public codeFormater:CodeFormater,) { }
  onNoClick(){
    this.matDialogRef.close();
  }
  ngOnInit() {
    this.codeFormaterForm=this.fb.group({
      Name:['',Validators.required],
      ItemName:[''],
      ItemLength:[0],
      IsSymbol:[false],
      IsSerial:[true],
      IsTodaysDate:[false],
      SymbolName:["underscore"],
      StartPossition:[0],
      LastNumber:[0],
      Prefix:[null],
      StringLength:['',Validators.required]
    })
    this.codeFormaterForm.valueChanges.subscribe(data=>{
      
    })
    if(this.codeFormater.Id!=null){
      this.codeFormaterForm.patchValue({
        Name:this.codeFormater.Name,
        ItemName:this.codeFormater.ItemName,
        ItemLength:this.codeFormater.ItemLength,
        IsSymbol:this.codeFormater.IsSymbol,
        IsSerial:this.codeFormater.IsSerial,
        IsTodaysDate:this.codeFormater.IsTodaysDate,
        SymbolName:this.codeFormater.SymbolName,
        StartPossition:this.codeFormater.StartPossition,
        LastNumber:this.codeFormater.LastNumber,
        Prefix:this.codeFormater.Prefix,
        StringLength:this.codeFormater.StringLength
      })
    }
  }
  changeIsSymbol($event){
    debugger
    if($event.target.checked){
      this.codeFormaterForm.controls['SymbolName'].setValidators([Validators.required]);
      this.codeFormaterForm.controls['SymbolName'].updateValueAndValidity();
      this.codeFormaterForm.controls['Prefix'].setValidators([Validators.required]);
      this.codeFormaterForm.controls['Prefix'].updateValueAndValidity();
    }
  }
  prefixChange($event){
    if( this.codeFormaterForm.controls['Prefix'].value!=''&&this.codeFormaterForm.controls['Prefix']!=null){
      this.codeFormaterForm.controls['ItemName'].disable();
    }
    else{
      this.codeFormaterForm.controls['Prefix'].enable();
      this.codeFormaterForm.controls['ItemName'].enable();
    }
  }
  itemNameChange($event){
    if( this.codeFormaterForm.controls['ItemName'].value!=''&&this.codeFormaterForm.controls['ItemName']!=null){
      this.codeFormaterForm.controls['Prefix'].disable();
    }
    else{
      this.codeFormaterForm.controls['ItemName'].enable();
      this.codeFormaterForm.controls['Prefix'].enable();
    }
  }
  saveCodeFormater(){
    let id=this.codeFormater.Id;
    this.codeFormater=this.codeFormaterForm.value;
    this.codeFormater.Id=id;
    if(this.codeFormater.Id==null){

      this.blockUi.start("Loading....,Please wait")
      this._generalSettingService.SaveCodeFormater(this.codeFormater).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          this.matDialogRef.close(response);
          let dialogData=new DialogData();
          dialogData.message="Save successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        this.blockUi.stop();
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
    else{
      this.blockUi.start("Loading....,Please wait")
      this._generalSettingService.UpdateCodeFormater(this.codeFormater).subscribe(response=>{
        this.blockUi.stop();
        let result=response
        if(result){
          this.matDialogRef.close(true);
          let dialogData=new DialogData();
          dialogData.message="Update successfully";
          this._alertBox.openDialog(dialogData);
        }
      },error=>{
        this.blockUi.stop();
        let message=error
        let dialogData=new DialogData();
        dialogData.message=message.Message;
        this._alertBox.openDialog(dialogData);
      })
    }
  }
}
