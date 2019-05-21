import { Component, OnInit, Input,Output,EventEmitter, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomDatatableService } from '../../services/common/custom-datatable.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PostLoginService } from '../../services/common/post-login.service';
import { DialogData } from '../../models/common/dialog-data.model';
import { AlertBoxService } from '../../shared/alert-box.service';
import { UserFormControl } from '../../models/common/user-form-control.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { Page } from '../../models/common/page.model';
import { PageService } from '../../services/common/page.service';
@Component({
  selector: 'app-custom-datatable',
  templateUrl: './custom-datatable.component.html',
  styleUrls: ['./custom-datatable.component.css']
})
export class CustomDatatableComponent implements OnChanges,OnDestroy,OnInit {
  @ViewChild('globalSearch') globalSearch:FormControl;
  @BlockUI() blockUi:NgBlockUI;
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
  searchTerm:string=null;
  //pagin start
  allItems: any[];
  pager: Page={totalItems: 0,
    currentPage:0,
    pageSize:0,
    totalPages:0,
    startPage:0,
    endPage: 0,
    startIndex: 0,
    endIndex: 0,
    pages: []
  }
  pagedItems:any=[];
  array:any[]=[]
  //paging end
  constructor(private _customDatatableService:CustomDatatableService,
    private _pageService:PageService
  ) { }
  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25
    };
      this.globalSearch.valueChanges.subscribe(data=>{
        debugger
        this.DataList1=[];
        if (data!=null&&data!=''){
          this.DataList.forEach(item => 
            this.ColumnList.forEach(a=>{
              if(item[a.Name]!=undefined){
               let result= item[a.Name].toUpperCase().includes(data.toString().toUpperCase());
               if(result){
                this.DataList1.push(item)
                this.allItems = this.DataList1
                this.setPage(1);
               }
              }
            })
          )
        }
        else{
          this.DataList1=this.DataList;
          this.allItems = this.DataList1
          this.setPage(1);
        }
      })
  }
  ngOnChanges() {
    debugger
    if(this.reload){
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 25
      };
      if(this.columnChange){
        this.DataList1=this._customDatatableService.DataList;
        this.allItems = this.DataList1
        this.setPage(1);
      }else{
        this.DataList1=this._customDatatableService.DataList;
        this.ColumnList=this._customDatatableService.ColumnList.filter(a=>{
         return a.IsEnable==true
        });
        this.allItems = this.DataList1
        this.setPage(1);
      }
    }
    // if(this.columnChange){
    //   //this.getUserFormControlByFormName();
    // }
  }
  setPage(page: number) {
    debugger
    // get pager object from service
    this.pager = this._pageService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.ColumnList, event.previousIndex, event.currentIndex);
  }
}
