import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest, HttpErrorResponse} from '@angular/common/http'
import { Http } from '@angular/http';
import { DefaultRouteService } from './default-route.service';
import { SessionService } from './session.service';
import { FormInfo } from '../../models/common/formInfo.model';
import { UrlResolver } from '@angular/compiler';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserFormControl } from '../../models/common/user-form-control.model';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient,
    ) 
    { }

    public getFormInfoList(formName:string){
      var url=this._defaultRoute.CommonService+'getFormInfo/'+formName;
      return this._httpClient.get(url).pipe(
        catchError(this.handleError)
      )
    }
    public saveFormInfoList(formInfoList:FormInfo[]){
      var url=this._defaultRoute.CommonService+'formInfo/'+formInfoList[0].FormName;
      return this._httpClient.put(url,formInfoList).pipe(
        catchError(this.handleError)
      )
    }
    public getMaufactureValidationData(){
      var url=this._defaultRoute.CommonService+'manufactureValidation';
      return this._httpClient.get(url).pipe(
        catchError(this.handleError)
      )
    }
    public getItemValidationData(){
      var url=this._defaultRoute.CommonService+'itemValidation';
      return this._httpClient.get(url).pipe(
        catchError(this.handleError)
      )
    }
    public getItemPurchaseValidationData(formName:string){
      var url=this._defaultRoute.CommonService+'itemPurchaseSalesValidation/'+formName;
      return this._httpClient.get(url).pipe(
        catchError(this.handleError)
      )
    }
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
}
