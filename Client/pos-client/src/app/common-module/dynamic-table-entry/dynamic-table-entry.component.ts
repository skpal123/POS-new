import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-dynamic-table-entry',
  templateUrl: './dynamic-table-entry.component.html',
  styleUrls: ['./dynamic-table-entry.component.css']
})
export class DynamicTableEntryComponent implements OnInit {
  @Input() Datalist: any = [];
  @Input() ColumnList: any = [];
  @Input() selectList: any = [];
  @Input() EditableStatus: any = [];
  @Input() AutoCompleteStatus: any = [];
  @Input() AutoCompleteDataSource: any = [];
  @Input() AutoCompleteList2: any = [];
  @Input() AutoCompleteList3: any = [];
  @Output() AutoCompleteDataSourceClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() DeleteDataRowClicked:EventEmitter <any>=new EventEmitter <any>();
  constructor() { 
    
  }
  ngOnInit() {
    debugger
  }
  AutoCompleteClick($data){
    this.AutoCompleteDataSourceClicked.emit($data)
  }
  deleteRow(index:number,$data){
    debugger
    if(index&&index!=0&&this.Datalist&&this.Datalist.length>1){
      this.Datalist.splice(index,1)
    }
    this.DeleteDataRowClicked.emit(index);
  }
  sendDataToParentComponent() {
    debugger
    alert(this.Datalist[0].Name)
  }
  onchange($event){
    debugger
  }
}
