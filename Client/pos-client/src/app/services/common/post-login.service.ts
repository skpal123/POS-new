import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from './default-route.service';
import { HttpService } from './http.service';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class PostLoginService {

  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    private _sessionService:SessionService,
    private _httpService:HttpService) { }
    setCustomHeader():Headers{
      let header =new Headers();
      header.append('Content-Type', 'application/json');
      header.append('sessionId', this._sessionService.SessionId);
      header.append("UserId",this._sessionService.User_Id);
      return header;
    }
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
  public getUserFormControlByFormName(fromName:string){
    var url=this._defaultRoute.FinanceService+'getFormControl/'+fromName;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
}
