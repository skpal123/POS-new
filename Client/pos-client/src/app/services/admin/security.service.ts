import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpService } from '../common/http.service';
import { RolePermissionDataInfo } from '../../models/admin/role-permissionlist.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    private _httpService:HttpService) { }
    setCustomHeader(header:Headers){
      header.append('Content-Type', 'application/json');
      header.append('sessionId', sessionStorage.getItem("sessionId"));
    }
  
  getRolePermissionsRoleById(roleId:string){
    var url=this._defaultRoute.administrationService+'getRolePermissionsByRoleId/'+roleId;
    return this._httpService.get(url)
  }
  getAllRolePermissions(){
    var url=this._defaultRoute.administrationService+'getRolePermissions';
    return this._httpService.get(url)
  }
  getMenusSubMenus(){
    var url=this._defaultRoute.administrationService+'getMainMenuSubMenu';
    const headers = new Headers();
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  geSubMenus(MenuSeqId:string){
    var url=this._defaultRoute.administrationService+'getSubMenusByMenuId/'+MenuSeqId;
    const headers = new Headers();
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  getRoleList(){
    var url=this._defaultRoute.administrationService+'getRules/';
    const headers = new Headers();
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  getRoleControlList(formName:string){
    var url=this._defaultRoute.administrationService+'getRuleControl/'+formName;
    const headers = new Headers();
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  saveRolePermission(rolePermissions:RolePermissionDataInfo){
    var url=this._defaultRoute.administrationService+'saveRolePermission';
    let headers=new Headers()
    this.setCustomHeader(headers);
    headers.append("ActionName","post");
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,rolePermissions,options)
  }
}
