import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from './default-route.service';
import { HttpService } from './http.service';
@Injectable({
  providedIn: 'root'
})
export class PostLoginService {

  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    private _httpService:HttpService) { }
  getMainMenus(){
    var url=this._defaultRoute.administrationService+'getMainModules/';
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
}
