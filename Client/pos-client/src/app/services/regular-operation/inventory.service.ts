import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http'
import { Http } from '@angular/http';
import { SessionService } from '../common/session.service';
import { DefaultRouteService } from '../common/default-route.service';
import { GroupItem } from '../../models/regular-operation/inventory/group-item.model';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient,
    private _sessionService:SessionService) 
    { }
    setCustomHeader():HttpHeaders{
      let header =new HttpHeaders();
      header.append('Content-Type', 'application/json');
      header.append('sessionId', this._sessionService.SessionId);
      header.append("UserId",this._sessionService.User_Id);
      return header;
    }
    public getGroupItemList(transactionType:string){
      var url=this._defaultRoute.InventoryService+'GroupItems/'+transactionType;
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'get');  
      return this._httpClient.get(url,{headers:headers})
    }
    public saveGroupItem(groupItem:GroupItem){
      var url=this._defaultRoute.InventoryService+'GroupItem';
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'POST');  
      return this._httpClient.post(url,groupItem,{headers:headers})
    }
    public UpdateGroupItem(groupItem:GroupItem){
      var url=this._defaultRoute.InventoryService+'GroupItem/'+groupItem.Id;
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'get');  
      return this._httpClient.put(url,groupItem,{headers:headers})
    }
    public getGroupItemById(Id:string){
      var url=this._defaultRoute.InventoryService+'GroupItem/'+Id;
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'get');  
      return this._httpClient.get(url,{headers:headers})
    }
    public deleteGroupItem(Id:string){
      var url=this._defaultRoute.InventoryService+'GroupItem/'+Id;
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'get');  
      return this._httpClient.delete(url,{headers:headers})
    }
}
