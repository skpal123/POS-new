import { Component, OnInit, Input,Output,EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomDatatableService } from '../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PostLoginService } from '../../services/common/post-login.service';
import { DialogData } from '../../models/common/dialog-data.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { UserFormControl } from '../../models/common/user-form-control.model';
@Component({
  selector: 'app-custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styleUrls: ['./custom-datatable.component.css']
})
export class CustomDatatableComponent implements OnChanges,OnDestroy {
  @BlockUI() blockUi:NgBlockUI
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  @Input() reload:boolean;
  @Input() columnChange:boolean;
  @Input() DataList: any = [];
  @Input() ColumnList: UserFormControl[] = [];
  @Output() EditSelectedRowClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() DeleteDataRowClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() CheckedAllItem:EventEmitter <any>=new EventEmitter <any>();
  DataList1:any=[];
  ColumnListEnable:UserFormControl[]=[];
  constructor(private _customDatatableService:CustomDatatableService,
    private _postLoginService:PostLoginService,
    private _alertBox:AlertBoxService
  ) { }

  ngOnChanges() {
    debugger
    if(this.reload){
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
      };
      if(this.columnChange){
        this.DataList1=this._customDatatableService.DataList;
      }else{
        this.DataList1=this._customDatatableService.DataList;
        this.ColumnList=this._customDatatableService.ColumnList.filter(a=>{
         return a.IsEnable==true
        });
        this.dtTrigger.next();
        this.dtTrigger.subscribe();
      }
    }
    // if(this.columnChange){
    //   //this.getUserFormControlByFormName();
    // }
  }
  getRowDetailsById($event){
    this.EditSelectedRowClicked.emit($event);
  }
  deleteRow($event){
    this.DeleteDataRowClicked.emit($event);
  }
  checkedAllItem($event){
    console.log($event);
    this.CheckedAllItem.emit($event.target.checked);
  }
  ngOnDestroy(): void {
    this._customDatatableService.ColumnList=[];
    this._customDatatableService.DataList=[]
    this.dtTrigger.unsubscribe();
  }
  
}
