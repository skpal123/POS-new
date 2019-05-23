import { Component, OnInit,Input,Output,EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { AlertBoxService } from '../../shared/alert-box.service';
import { CommonService } from '../../services/common/common.service';
import { DialogData } from '../../models/common/dialog-data.model';
import { NavigationDataService } from '../../services/common/navigation-data.service';

@Component({
  selector: 'app-autocode-generate',
  templateUrl: './autocode-generate.component.html',
  styleUrls: ['./autocode-generate.component.css']
})
export class AutocodeGenerateComponent implements OnInit,OnChanges,OnDestroy {
  @Input() itemName: string
  @Input()  IsSaved:boolean
  @Output() getGenerateAutoCode:EventEmitter <any>=new EventEmitter <any>();
  code:string=null;
  IsCreated:boolean=false;
  IsAutoCode:boolean=false;
  constructor(private _alertBox:AlertBoxService,
    private _navigationData:NavigationDataService,
    private _commonService:CommonService,) { }

  ngOnInit() {

  }
  ngOnChanges(){
    if( this.IsAutoCode&&!this.IsSaved){
      alert('Not saved');
    }
  }
  generatedAutoCode($event){
    if($event.target.checked){
      if(!this.IsCreated){
        this.getAutoCode(this.itemName)
      }
    }
  }
  getAutoCode(itemName:string){
    this._commonService.GetAutoCodeByProductName(itemName).subscribe((response:string)=>{
      this.code=response;
      this.IsCreated=true;
      this.getGenerateAutoCode.emit(this.code)
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
  ngOnDestroy(){
    debugger
    if(!this._navigationData.IsSaved&&this.IsAutoCode){
      this.resetCode(this.itemName);
    }
    this._navigationData.IsSaved=false;
  }
  resetCode(itemName:string){
    this._commonService.resetLastNumberCodeFormaterByProductName(itemName).subscribe((response:string)=>{
      
    },error=>{
      let dialogData=new DialogData();
      dialogData.message=error
      this._alertBox.openDialog(dialogData);
    })
  }
}
