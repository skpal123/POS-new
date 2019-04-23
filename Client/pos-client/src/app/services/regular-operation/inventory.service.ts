import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest, HttpErrorResponse} from '@angular/common/http'
import { Http } from '@angular/http';
import { SessionService } from '../common/session.service';
import { DefaultRouteService } from '../common/default-route.service';
import { GroupItem } from '../../models/regular-operation/inventory/group-item.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
    public getGroupItemList(transactionType:string){
      var url=this._defaultRoute.InventoryService+'GroupItems/'+transactionType;
      return this._httpClient.get<GroupItem[]>(url).pipe(
        catchError(this.handleError)
      )
    }
    public saveGroupItem(groupItem:GroupItem){
      var url=this._defaultRoute.InventoryService+'GroupItem';
      return this._httpClient.post<boolean>(url,groupItem).pipe(
        catchError(this.handleError)
      )
    }
    public UpdateGroupItem(groupItem:GroupItem){
      var url=this._defaultRoute.InventoryService+'GroupItem/'+groupItem.Id;
      return this._httpClient.put<boolean>(url,groupItem).pipe(
        catchError(this.handleError)
      )
    }
    public getGroupItemById(Id:string){
      var url=this._defaultRoute.InventoryService+'GroupItem/'+Id;
      return this._httpClient.get<GroupItem>(url).pipe(
        catchError(this.handleError)
      )
    }
    public gettemStockByLocationAndItemId(itemId:string,locationId:string){
      var url=this._defaultRoute.InventoryService+'getItemStock/'+itemId+'/'+locationId;
      return this._httpClient.get<number>(url).pipe(
        catchError(this.handleError)
      )
    }
    public deleteGroupItem(Id:string){
      var url=this._defaultRoute.InventoryService+'GroupItem/'+Id;
      return this._httpClient.delete<boolean>(url).pipe(
        catchError(this.handleError)
      )
    }
    private handleError(error: HttpErrorResponse) {
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
}
