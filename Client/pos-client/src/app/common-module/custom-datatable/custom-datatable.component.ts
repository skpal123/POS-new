import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styleUrls: ['./custom-datatable.component.css']
})
export class CustomDatatableComponent implements OnInit {
  @Input() DataList: any = [];
  @Input() ColumnList: any = [];
  @Output() EditSelectedRowClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() DeleteDataRowClicked:EventEmitter <any>=new EventEmitter <any>();
  constructor() { }

  ngOnInit() {
    debugger
    console.log(this.DataList)
  }
  getRowDetailsById($event){
    this.EditSelectedRowClicked.emit($event);
  }
  deleteRow($event){
    this.DeleteDataRowClicked.emit($event);
  }
}
