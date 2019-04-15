import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest} from '@angular/common/http'
import { Http } from '@angular/http';
import { DefaultRouteService } from './default-route.service';
import { SessionService } from './session.service';
import { FormInfo } from '../../models/common/formInfo.model';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

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
    public getFormInfoList(formName:string){
      var url=this._defaultRoute.CommonService+'getFormInfo/'+formName;
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'get');  
      return this._httpClient.get(url,{headers:headers})
    }
    public saveFormInfoList(formInfoList:FormInfo[]){
      var url=this._defaultRoute.CommonService+'formInfo/'+formInfoList[0].FormName;
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'POST');  
      return this._httpClient.put(url,formInfoList,{headers:headers})
    }
    public getMaufactureValidationData(){
      var url=this._defaultRoute.CommonService+'manufactureValidation';
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'get');  
      return this._httpClient.get(url,{headers:headers})
    }
    public getItemValidationData(){
      var url=this._defaultRoute.CommonService+'itemValidation';
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'get');  
      return this._httpClient.get(url,{headers:headers})
    }
    public getItemPurchaseValidationData(formName:string){
      var url=this._defaultRoute.CommonService+'itemPurchaseSalesValidation/'+formName;
      let headers =  this.setCustomHeader();
      headers.append('ActionName', 'get');  
      return this._httpClient.get(url,{headers:headers})
    }
}
