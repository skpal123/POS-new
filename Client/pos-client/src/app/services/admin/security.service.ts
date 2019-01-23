import { Injectable } from '@angular/core';
import { SecurityModule } from '../../admin/security/security.module';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    private _httpService:HttpService) { }
  getRolePermissions(){
    var url=this._defaultRoute.administrationService+'getRolePermissions';
    return this._httpService.get(url)
  }
  getMenusSubMenus(){
    var url=this._defaultRoute.administrationService+'getMainMenuSubMenu';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  geSubMenus(MenuSeqId:string){
    var url=this._defaultRoute.administrationService+'getSubMenusByMenuId/'+MenuSeqId;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  getRoleList(){
    var url=this._defaultRoute.administrationService+'getRules/';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  getRoleControlList(){
    var url=this._defaultRoute.administrationService+'getRuleControl/';
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('ActionName', 'get');
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
}
