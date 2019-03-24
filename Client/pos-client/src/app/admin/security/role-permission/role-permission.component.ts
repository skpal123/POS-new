import { Component, OnInit } from '@angular/core';
import { Tree } from '../../../models/common/tree.model';
import { SecurityService } from '../../../services/admin/security.service';
import { AlertBoxService } from '../../../shared/alert-box.service';
import { DialogData } from '../../../models/common/dialog-data.model';
import { Role } from '../../../models/admin/role.model';
import { RoleControl } from '../../../models/admin/role-control.model';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { MatDialog } from '@angular/material';
import { AddRolePermissionComponent } from '../add-role-permission/add-role-permission.component';
import { RolePermissionData } from '../../../models/admin/role-permission-data.model';
import { PostLoginService } from '../../../services/common/post-login.service';
import { BlockUI,NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  isFound:boolean=false;
  p:Tree[]=[]
  roleList:Role[]=[];
  roleControlList:RoleControl[]=[];
  roleControlViewList:any[][]=[];
  tree:Tree[]=[];
  DataList:any[]=[];
  ColumnList:any[]=[];
  rolePermissionData:RolePermissionData={
    tree:null,
    role:{
      Id:null,RoleName:null,Description:null,Status:true
    }
  }
  newRolePermissionTree:Tree[]=[]
  constructor(private _securityService:SecurityService,
    private _alertBox:AlertBoxService,
    private _postLoginService:PostLoginService,
  private dialog:MatDialog) { }
  ngOnInit() {
    debugger  
    this.getRoleList();
    this.getRoleControlList();
  }
getRoleList(){
  this.blockUI.start("Loading ... Please wait");
  this._securityService.getRoleList().subscribe(response=>{
    this.blockUI.stop();
    this.roleList=response.json();
    this.DataList=this.roleList;
    this.dtTrigger.next();
    this.getRolePermissons();
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    var message=error.json();
    data.message=message.Message;
    this._alertBox.openDialog(data);
  })
}
getRoleControlList(){
  this.blockUI.start("Loading ... Please wait");
  this._postLoginService.getUserFormControlByFormName('role-permission').subscribe(response=>{
    this.blockUI.stop();
    this.roleControlList=response.json();
    this.ColumnList=this.roleControlList;
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    var message=error.json();
    data.message=message.Message;
    this._alertBox.openDialog(data);
  })
}
getRolePermissonsById(roleId:string){
  this.blockUI.start("Loading ... Please wait");
  this._securityService.getRolePermissionsRoleById(roleId).subscribe(response=>{
    this.blockUI.stop();
    this.tree=response.json();
    console.log(this.tree);
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    var message=error.json();
    data.message=message.Message;
    this._alertBox.openDialog(data);
  })
}
getRolePermissons(){
  this.blockUI.stop();
  this.blockUI.start("Loading ... Please wait");
  this._securityService.getAllRolePermissions().subscribe(response=>{
    this.blockUI.stop();
    this.newRolePermissionTree=response.json();
    console.log(this.tree);
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    var message=error.json();
    data.message=message.Message;
    this._alertBox.openDialog(data);
  })
}
createNewRolePermission(){
 this.rolePermissionData.tree=this.newRolePermissionTree;
 this.rolePermissionData.role.Description=null;
 this.rolePermissionData.role.Id=null;
 this.rolePermissionData.role.RoleName=null;
 this.rolePermissionData.role.Status=true;
 const dialogRef=this.dialog.open(AddRolePermissionComponent,{
    maxHeight:'600px',
    width:'500px',
    maxWidth:'500px',
    disableClose:true,
    data:this.rolePermissionData
  });
  dialogRef.afterClosed().subscribe(response=>{
  })
}

deleteRole($event:string){
  alert($event)
}
getRolePermissionDetailsById(Id:string){
  this.blockUI.start("Loading ... Please wait");
  this._securityService.getRolePermissionsRoleById(Id).subscribe(response=>{
    this.blockUI.stop();
    this.tree=response.json();
    let index=this.roleList.findIndex(role=>role.Id==Id);
    let role=this.roleList[index];
    this.rolePermissionData.tree=this.tree
    this.rolePermissionData.role=role
    const dialogRef=this.dialog.open(AddRolePermissionComponent,{
      maxHeight:'700px',
      width:'700px',
      maxWidth:'800px',
      disableClose:true,
      data: this.rolePermissionData
    });
    dialogRef.afterClosed().subscribe(response=>{
      alert('test'+response);
    })
  },error=>{
    this.blockUI.stop();
    var data=new DialogData();
    var message=error.json();
    data.message=message.Message;
    this._alertBox.openDialog(data);
  })
}
}
