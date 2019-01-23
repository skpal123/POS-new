import { Component, OnInit } from '@angular/core';
import { Tree } from '../../../models/common/tree.model';
import { SecurityService } from '../../../services/admin/security.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { Role } from '../../../models/admin/role.model';
import { RoleControl } from '../../../models/admin/role-control.model';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isFound:boolean=false;
  p:Tree[]=[]
  roleList:Role[]=[];
  roleControlList:RoleControl[]=[];
  roleControlViewList:any[][]=[];
tree:Tree[]=[];
  constructor(private _securityService:SecurityService,private _alertBox:AlertBoxService) { }

  ngOnInit() {
    debugger
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getRoleList();
    //this.getRolePermissons();
  }
  showCategory(id:number){
   var position= this.tree.findIndex(fea=>fea.Id==id.toString());
   if(this.tree[position].IsClicked){
    this.tree[position].IsClicked=false;
    this.tree[position].Children.forEach((a,b,array)=>{
      a.Status=true
    })
   }
   else{
    this.tree[position].IsClicked=true;
    this.tree[position].Children.forEach((a,b,array)=>{
      a.Status=false
    })
   }
   
  }
  showSubCategory(id:number){
    this.isFound=false;
      this.tree.forEach((subcategory,index,array)=>{
        if(!this.isFound){
          var position= subcategory.Children.findIndex(fea=>fea.Id==id.toString());
          if(position!=-1){
            this.isFound=true;
            if(subcategory.Children[position].IsClicked){
              subcategory.Children[position].IsClicked=false;
              for(var i=0;i<subcategory.Children[position].Children.length;i++){
                subcategory.Children[position].Children[i].Status=true;
              }
              
             }
             else{
              subcategory.Children[position].IsClicked=true;
              for(var i=0;i<subcategory.Children[position].Children.length;i++){
                subcategory.Children[position].Children[i].Status=false;
              }
             }
          }
        }
        
        
      })
   
  }
  showSubItem(id:number){
    this.isFound=false;
      this.tree.forEach((subcategory,index,array)=>{
        subcategory.Children.forEach((treeitem,index,array)=>{
          if(!this.isFound){
            var position= treeitem.Children.findIndex(fea=>fea.Id==id.toString());
            if(position!=-1){
              this.isFound=true;
              if(treeitem.Children[position].IsClicked){
                treeitem.Children[position].IsClicked=false;
                for(var i=0;i<treeitem.Children[position].Children.length;i++){
                  treeitem.Children[position].Children[i].Status=true;
                }               
               }
               else{
                treeitem.Children[position].IsClicked=true;
                for(var i=0;i<treeitem.Children[position].Children.length;i++){
                  treeitem.Children[position].Children[i].Status=false;
                }
               }
            }
          }
        })
      }) 
  }
  showItem(id:number){

  }
  selectedNode(item:any){
    console.log(item);
  }
getRolePermissons(){
  this._securityService.getRolePermissions().subscribe(response=>{
    this.tree=response.json();
    console.log(this.tree);
  },error=>{
    var data=new DialogData();
    var message=error.json();
    data.message=message.Message;
    this._alertBox.openDialog(data);
  })
}
getRoleList(){
  this._securityService.getRoleList().subscribe(response=>{
    this.roleList=response.json();
    this.dtTrigger.next();
    this.getRoleControlList();
  },error=>{
    var data=new DialogData();
    var message=error.json();
    data.message=message.Message;
    this._alertBox.openDialog(data);
  })
}
getRoleControlList(){
  this._securityService.getRoleControlList().subscribe(response=>{
    this.roleControlList=response.json();
    this.getRolePermissons();
  },error=>{
    var data=new DialogData();
    var message=error.json();
    data.message=message.Message;
    this._alertBox.openDialog(data);
  })
}
}
