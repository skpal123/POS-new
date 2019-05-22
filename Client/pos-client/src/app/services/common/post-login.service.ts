import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from './default-route.service';
import { HttpService } from './http.service';
import { SessionService } from './session.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserFormControl } from '../../models/common/user-form-control.model';
import { Module } from '../../models/admin/module.model';
import { Submenu } from '../../models/admin/submenu.model';
import { Menu } from '../../models/admin/menu.model';
@Injectable({
  providedIn: 'root'
})
export class PostLoginService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
    private handleError(error: HttpErrorResponse) {
      debugger

      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
        return throwError(error.error.message) 
      } 
      else 
      {
        let message=error.error.Message;       
        return throwError(message+'<br/>'+error.message) 
      }
      // return an observable with a user-facing error message
    };
  getMainMenus(){
    var url=this._defaultRoute.administrationService+'getMainModules/';
    return this._httpClient.get<Module[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  getMenusSubMenus(){
    var url=this._defaultRoute.administrationService+'getMainMenuSubMenu';
    return this._httpClient.get<Menu[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  geSubMenus(MenuSeqId:string){
    var url=this._defaultRoute.administrationService+'getSubMenusByMenuId/'+MenuSeqId;
    return this._httpClient.get<Submenu[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public getUserFormControlByFormName(fromName:string){
    var url=this._defaultRoute.CommonService+'getFormControl/'+fromName;
    return this._httpClient.get<UserFormControl[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public saveColumnInfoList(columnInfolist:UserFormControl[]){
    var url=this._defaultRoute.CommonService+'saveColumnInfo/'+columnInfolist[0].FormName;
    return this._httpClient.put(url,columnInfolist).pipe(
      catchError(this.handleError)
    )
  }
  public GetAutoCodeByProductName(productName:string){
    var url=this._defaultRoute.CommonService+'getAutoCode/'+productName;
    return this._httpClient.get<string>(url).pipe(
      catchError(this.handleError)
    )
  }
}
