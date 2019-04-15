import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from './default-route.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    private _sessionService:SessionService) 
    { }
    setCustomHeader():Headers{
      let header =new Headers();
      header.append('Content-Type', 'application/json');
      header.append('sessionId', this._sessionService.SessionId);
      header.append("UserId",this._sessionService.User_Id);
      return header;
    }
  public getUnitDropdownList(){
    var url=this._defaultRoute.DropdownService+'UnitDropdown';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getCategoryDropdownList(){
    var url=this._defaultRoute.DropdownService+'CategoryDropdown'; 
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getSubCategoryDropdownList(Id:string){
    var url=this._defaultRoute.DropdownService+'SubCategoryDropdown/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getItemDropdownList(Id:string){
    var url=this._defaultRoute.DropdownService+'ItemDropdown/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getLedgerDropdownList(){
    var url=this._defaultRoute.DropdownService+'LedgerDropdown';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getSubledgerDropdownList(Id:string){
    var url=this._defaultRoute.DropdownService+'SubledgerDropdown/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getLocationDropdownList(){
    var url=this._defaultRoute.DropdownService+'LocationDropdown';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getSupplierDropdownList(){
    var url=this._defaultRoute.DropdownService+'supplierDropdown';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getCustomerDropdownList(){
    var url=this._defaultRoute.DropdownService+'customerDropdown';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getPartyDropdownList(){
    var url=this._defaultRoute.DropdownService+'partyDropdown';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
}
