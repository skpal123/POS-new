import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpService } from '../common/http.service';
import { SessionService } from '../common/session.service';
import { ChartOfaccount } from '../../models/master-settings/account-defination/chart-of-account.model';
import { Subledger } from '../../models/master-settings/account-defination/subledger.model';

@Injectable({
  providedIn: 'root'
})
export class AccountDefinationService {

  constructor(private _http:Http,
    private _defaultRoute:DefaultRouteService,
    private _httpService:HttpService,
    private _sessionService:SessionService) 
    { }
    setCustomHeader():Headers{
      let header =new Headers();
      header.append('Content-Type', 'application/json');
      header.append('sessionId', this._sessionService.SessionId);
      header.append("UserId",this._sessionService.User_Id);
      return header;
    }
  public getChartOfAccountListForTree(){
    var url=this._defaultRoute.FinanceService+'getChartOfAccountList/';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateChartOfAccount(account:ChartOfaccount){
    var url=this._defaultRoute.FinanceService+'createChartOfAccount';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,account,options);
  }
  public UpdateChartOfAccount(account:ChartOfaccount){
    var url=this._defaultRoute.FinanceService+'createChartOfAccount/'+account.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,account,options);
  }
  public getMaxAccidByGroupIdAndLevelId(groupId:number,levelId:number){
    var url=this._defaultRoute.FinanceService+'getMaxAccid/'+levelId+"/"+groupId;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public getAccountListForAccountOpening(){
    var url=this._defaultRoute.FinanceService+'getAccountListForopening';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public AddSubleder(subledger:Subledger){
    var url=this._defaultRoute.FinanceService+'addSubledger';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,subledger,options);
  }
  public UpdateSubleder(Id:string,subledger:Subledger){
    var url=this._defaultRoute.FinanceService+'addSubledger/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,subledger,options);
  }
  public GetSublederList(Id:string){
    var url=this._defaultRoute.FinanceService+'getSubledgerList/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public GetSublederById(Id:string){
    var url=this._defaultRoute.FinanceService+'getSubledgerById/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public DeleteGetSublederById(Id:string){
    var url=this._defaultRoute.FinanceService+'deleteSubledger/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
}
