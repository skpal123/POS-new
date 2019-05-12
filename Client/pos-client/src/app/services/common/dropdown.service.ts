import { Injectable } from '@angular/core';
import { DefaultRouteService } from './default-route.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SelectDropdown } from '../../models/common/select.dropdown.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
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
  public getUnitDropdownList(){
    var url=this._defaultRoute.DropdownService+'UnitDropdown';
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getCategoryDropdownList(){
    var url=this._defaultRoute.DropdownService+'CategoryDropdown'; 
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getSubCategoryDropdownList(Id:string){
    var url=this._defaultRoute.DropdownService+'SubCategoryDropdown/'+Id;
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getItemDropdownList(Id:string){
    var url=this._defaultRoute.DropdownService+'ItemDropdown/'+Id;
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getLedgerDropdownList(){
    var url=this._defaultRoute.DropdownService+'LedgerDropdown';
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getSubledgerDropdownList(Id:string){
    var url=this._defaultRoute.DropdownService+'SubledgerDropdown/'+Id;
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getLocationDropdownList(){
    var url=this._defaultRoute.DropdownService+'LocationDropdown';
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getSupplierDropdownList(){
    var url=this._defaultRoute.DropdownService+'supplierDropdown';
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getCustomerDropdownList(){
    var url=this._defaultRoute.DropdownService+'customerDropdown';
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getPartyDropdownList(){
    var url=this._defaultRoute.DropdownService+'partyDropdown';
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
  public getLedgerDropdownListByPaymentMode(paymentMode:string){
    var url=this._defaultRoute.DropdownService+'getLedgerByPaymentMode/'+paymentMode;
    return this._httpClient.get<SelectDropdown[]>(url).pipe(
      catchError(
        this.handleError
      )
    )
  }
}
