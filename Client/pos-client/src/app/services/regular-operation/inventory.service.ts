import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders,HttpRequest, HttpErrorResponse} from '@angular/common/http'
import { Http } from '@angular/http';
import { SessionService } from '../common/session.service';
import { DefaultRouteService } from '../common/default-route.service';
import { GroupItem } from '../../models/regular-operation/inventory/group-item.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SupplierTransaction } from '../../models/regular-operation/inventory/supplier-transaction.model';
import { CustomerTransaction } from '../../models/regular-operation/inventory/customer-transaction.model';
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
    public getSupplierTranscationList(startDate:Date,endDate:Date,supplierId:string){
      var url=this._defaultRoute.InventoryService+'SupplierTransactions/'+this._defaultRoute.convertDate(startDate)+'/'+this._defaultRoute.convertDate(endDate)+'/'+supplierId;
      return this._httpClient.get<SupplierTransaction[]>(url).pipe(
        catchError(this.handleError)
      )
    }
    public saveSupplierTransaction(supplierTransaction:SupplierTransaction){
      var url=this._defaultRoute.InventoryService+'SupplierTransaction';
      return this._httpClient.post<boolean>(url,supplierTransaction).pipe(
        catchError(this.handleError)
      )
    }
    public UpdateSupplierTransaction(supplierTransaction:SupplierTransaction){
      var url=this._defaultRoute.InventoryService+'SupplierTransaction/'+supplierTransaction.Id;
      return this._httpClient.put<boolean>(url,supplierTransaction).pipe(
        catchError(this.handleError)
      )
    }
    public getSupplierTransactionById(Id:string){
      var url=this._defaultRoute.InventoryService+'SupplierTransaction/'+Id;
      return this._httpClient.get<SupplierTransaction>(url).pipe(
        catchError(this.handleError)
      )
    }
    public deleteSupplierTransactionById(Id:string){
      var url=this._defaultRoute.InventoryService+'SupplierTransaction/'+Id;
      return this._httpClient.delete<SupplierTransaction>(url).pipe(
        catchError(this.handleError)
      )
    }
    public getPartyTransactionList(startDate:Date,endDate:Date,customerId){
      var url=this._defaultRoute.InventoryService+'PartyTransactions/'+this._defaultRoute.convertDate(startDate)+'/'+this._defaultRoute.convertDate(endDate)+'/'+customerId;;
      return this._httpClient.get<CustomerTransaction[]>(url).pipe(
        catchError(this.handleError)
      )
    }
    public savePartyTransaction(supplierTransaction:SupplierTransaction){
      var url=this._defaultRoute.InventoryService+'PartyTransaction';
      return this._httpClient.post<boolean>(url,supplierTransaction).pipe(
        catchError(this.handleError)
      )
    }
    public UpdatePartyTransaction(customerTransaction:CustomerTransaction){
      var url=this._defaultRoute.InventoryService+'PartyTransaction/'+customerTransaction.Id;
      return this._httpClient.put<boolean>(url,customerTransaction).pipe(
        catchError(this.handleError)
      )
    }
    public getPartyTransactionById(Id:string){
      var url=this._defaultRoute.InventoryService+'PartyTransaction/'+Id;
      return this._httpClient.get<CustomerTransaction>(url).pipe(
        catchError(this.handleError)
      )
    }
    public deletePartyTransactionById(Id:string){
      var url=this._defaultRoute.InventoryService+'PartyTransaction/'+Id;
      return this._httpClient.delete<GroupItem>(url).pipe(
        catchError(this.handleError)
      )
    }
    public GetSalesTransactionList(transactionType:string,customerId:string){
      var url=this._defaultRoute.InventoryService+'SalesTransactions/'+transactionType+'/'+customerId;
      return this._httpClient.get<GroupItem[]>(url).pipe(
        catchError(this.handleError)
      )
    }
    public GetPurchaseTransactionList(transactionType:string,supplierId:string){
      var url=this._defaultRoute.InventoryService+'PurchaseTransactions/'+transactionType+'/'+supplierId;
      return this._httpClient.get<GroupItem[]>(url).pipe(
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
