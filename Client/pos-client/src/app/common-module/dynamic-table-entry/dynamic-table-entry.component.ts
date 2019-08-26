import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { DatatableTextOutput } from '../../models/common/datatable-text-click.model';
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
  @Output() GetColumnValueClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() GetDatatableColumnTextClicked:EventEmitter <any>=new EventEmitter <any>();
  @Output() AddNewRow:EventEmitter <any>=new EventEmitter <any>();
  data={value:0,name:"",index:0}
  datatableTextOutput:DatatableTextOutput={ColumnName:null,RowData:null};
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
  GetColumnValue(value:number,name:string,index:number){
    this.data.name=name;
    this.data.value=value;
    this.data.index=index;
    this.GetColumnValueClicked.emit(this.data)
  }
  sendDataToParentComponent() {
    debugger
    alert(this.Datalist[0].Name)
  }
  datatableTextColumnClicked($data:any,columnName:string,index:number){
    this.datatableTextOutput.ColumnName=columnName;
    this.datatableTextOutput.RowData=$data;
    this.datatableTextOutput.Index=index;
    this.GetDatatableColumnTextClicked.emit(this.datatableTextOutput);
  }
  addNewRow(){
    this.AddNewRow.emit();
  }
  onchange($event){
    debugger
  }
}
