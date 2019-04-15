import { Component, OnInit, Input,Output,EventEmitter, OnChanges } from '@angular/core';
@Component({
  selector: 'app-custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styleUrls: ['./custom-datatable.component.css']
})
export class CustomDatatableComponent implements OnChanges {
  @Input() reload:boolean;
  @Input() DataList: any = [];
  @Input() ColumnList: any = [];
  @Output() EditSelectedRowClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() DeleteDataRowClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() CheckedAllItem:EventEmitter <any>=new EventEmitter <any>();
  DataList1:any=[];
  constructor() { }

  ngOnChanges() {
    debugger
    if(this.reload){
      this.DataList1=this.DataList
    }
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
}
