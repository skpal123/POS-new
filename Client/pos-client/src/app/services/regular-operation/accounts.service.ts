import { Injectable } from '@angular/core';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpService } from '../common/http.service';
import { SessionService } from '../common/session.service';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Voucher } from '../../models/regular-operation/finance/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

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
  public getVoucherList(){
    var url=this._defaultRoute.FinanceService+'getvoucherList';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public getVoucherDetailsById(id:string){
    var url=this._defaultRoute.FinanceService+'getVoucheryid/'+id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'GET');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  // public UpdateChartOfAccount(account:ChartOfaccount){
  //   var url=this._defaultRoute.FinanceService+'createChartOfAccount/'+account.Id;
  //   let headers =  this.setCustomHeader();
  //   headers.append('ActionName', 'PUT');  
  //   const options = new RequestOptions({ headers: headers });
  //   return this._http.post(url,account,options);
  // }
  public getChildAccountList(){
    var url=this._defaultRoute.FinanceService+'getChildAccount';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'GET');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public CreateVoucher(voucher:Voucher){
    var url=this._defaultRoute.FinanceService+'createVoucher';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,voucher,options);
  }
  public UpdateVoucher(voucher:Voucher){
    var url=this._defaultRoute.FinanceService+'updateVoucher/'+voucher.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,voucher,options);
  }
  public deleteVoucher(Id:string){
    var url=this._defaultRoute.FinanceService+'deleteVoucher/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'Delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
}
