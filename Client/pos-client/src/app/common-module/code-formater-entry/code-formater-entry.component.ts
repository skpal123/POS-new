import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GeneralSettingsService } from '../../services/admin/general-settings.service';
import { AlertBoxService } from '../../shared/alert-box.service';
import { CodeFormater } from '../../models/admin/code-formater.model';
import { DialogData } from '../../models/common/dialog-data.model';

@Component({
  selector: 'app-code-formater-entry',
  templateUrl: './code-formater-entry.component.html',
  styleUrls: ['./code-formater-entry.component.css']
})
export class CodeFormaterEntryComponent implements OnInit {
  @BlockUI() blockUi:NgBlockUI
  codeFormaterForm:FormGroup
  priview:string=null;
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
      SymbolName:[''],
      StartPossition:[0],
      LastNumber:[0],
      Prefix:[null],
      StringLength:['',Validators.required],
      MiddleSymbol:'',
      Preview:''
    })
    // this.codeFormaterForm.valueChanges.subscribe(data=>{
    //   debugger
      
    // })
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
  updateValidation(){
    debugger
    if(this.codeFormaterForm.get('MiddleSymbol').value!=''){
      this.codeFormaterForm.controls['IsTodaysDate'].setValidators([Validators.requiredTrue]);
      this.codeFormaterForm.controls['IsTodaysDate'].updateValueAndValidity();
      this.codeFormaterForm.controls['IsSerial'].setValidators([Validators.requiredTrue]);
      this.codeFormaterForm.controls['IsSerial'].updateValueAndValidity();
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
    else{
      this.codeFormaterForm.controls['SymbolName'].clearValidators();
      this.codeFormaterForm.controls['SymbolName'].updateValueAndValidity();
      this.codeFormaterForm.controls['Prefix'].clearValidators();
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
  seePreview(){
    debugger
    this.codeFormater=this.codeFormaterForm.value;
    if(this.codeFormater.IsTodaysDate&&this.codeFormater.IsSerial&&this.codeFormater.IsSymbol){
        var firstPart=this.codeFormater.Prefix+"-"+new Date().getFullYear();
        var month=this.appendSting(new Date().getMonth()+1);
        var day=this.appendSting(new Date().getDate());
        firstPart=firstPart+month+day;
      if(this.codeFormater.SymbolName=="hifen")
      {      
        if(this.codeFormater.MiddleSymbol!=null){
          firstPart+=this.codeFormater.MiddleSymbol;
        }
       // this.codeFormaterForm.controls['Preview'].setValue(firstPart+this.codeFormater.StartPossition)
        let length=firstPart.length;
        if(this.codeFormater.StringLength>length){
          let digitCount=this.codeFormater.StartPossition.toString().length;
          let dif=this.codeFormater.StringLength-(length+digitCount);
          let repeatStr="0".repeat(dif)
          let secondPart=repeatStr+this.codeFormater.StartPossition;
          this.codeFormaterForm.controls['Preview'].setValue(firstPart+secondPart)
        }
      
      }
      else if(this.codeFormater.SymbolName=="underscore"){
        if(this.codeFormater.MiddleSymbol!=null){
          firstPart+=this.codeFormater.MiddleSymbol;
        }
        let length=firstPart.length;
        if(this.codeFormater.StringLength>length){
          let digitCount=this.codeFormater.StartPossition.toString().length;
          let dif=this.codeFormater.StringLength-(length+digitCount);
          let repeatStr="0".repeat(dif)
          let secondPart=repeatStr+this.codeFormater.StartPossition;
          this.codeFormaterForm.controls['Preview'].setValue(firstPart+secondPart)
        }
      }
      else{    
        this.codeFormaterForm.controls['Preview'].setValue(str+this.codeFormater.StartPossition)
      }
    }
    else if(this.codeFormater.IsSerial&&this.codeFormater.IsTodaysDate){
      var str=new Date().getFullYear()+this.appendSting(new Date().getMonth()+1)+this.appendSting(new Date().getDate());
      this.codeFormaterForm.controls['Preview'].setValue(str+this.codeFormater.StartPossition)
    }
  }
  appendSting(value:number){
    if(value<10){
      return "0"+value;
    }
    else{
     return value.toString()
    }
  }
 
}
