import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { AlertBoxService } from '../../shared/alert-box.service';
import { DialogData } from '../../models/common/dialog-data.model';
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
  constructor() { 
    
  }
  ngOnInit() {
  }
  AutoCompleteClick($data){
    debugger
    this.AutoCompleteDataSourceClicked.emit($data)
  }
  sendDataToParentComponent() {
    debugger
    alert(this.Datalist[0].Name)
  }
  onchange($event){
    debugger
  }
}
