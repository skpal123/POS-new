import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpService } from '../common/http.service';
import { SessionService } from '../common/session.service';
import { InventoryLocation } from '../../models/master-settings/inventory-defination/inventory-location.model';
import { Unit } from '../../models/master-settings/inventory-defination/unit.model';
import { Category } from '../../models/master-settings/inventory-defination/category.model';
import { Subcategory } from '../../models/master-settings/inventory-defination/subcategory.model';
import { Manufacture } from '../../models/master-settings/inventory-defination/manufacture.model';
import { Supplier } from '../../models/master-settings/inventory-defination/supplier.model';
import { Party } from '../../models/master-settings/inventory-defination/party.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AlertBoxService } from '../../shared/alert-box.service';
import { BlockUI,NgBlockUI } from 'ng-block-ui';
import { DialogData } from '../../models/common/dialog-data.model';
import { InventoryItem } from '../../models/master-settings/inventory-defination/inventory-item.model';
import { Customer } from '../../models/master-settings/inventory-defination/customer.model';
import { SettingSellprice } from '../../models/master-settings/inventory-defination/setting-sell-price.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryDefinationServiceService {
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
  public getLocationList():Observable<InventoryLocation[]>{
    debugger
    var url=this._defaultRoute.InventoryService+'locations';
    return this._httpClient.get<InventoryLocation[]>(url)
    .pipe(
      catchError(
        this.handleError
      )
    )
  }
  public CreateLocation(location:InventoryLocation){
    var url=this._defaultRoute.InventoryService+'location';
    return this._httpClient.post<InventoryLocation>(url,location)
    .pipe(
      catchError(this.handleError)
    )
  }
  public UpdateLocation(location:InventoryLocation){
    var url=this._defaultRoute.InventoryService+'location/'+location.Id;
    return this._httpClient.put(url,location)
    .pipe(
      catchError(this.handleError)
    )
  }
  public getLocationById(Id:string){
    var url=this._defaultRoute.InventoryService+'location/'+Id;
    return this._httpClient.get<InventoryLocation>(url).pipe(
      catchError(this.handleError)
    )
  }
  public deleteLocation(Id:string){
    var url=this._defaultRoute.InventoryService+'location/'+Id;
    return this._httpClient.delete(url).pipe(
      catchError(this.handleError)
    )
  }
  public getUnitList(){
    var url=this._defaultRoute.InventoryService+'units';
    return this._httpClient.get<Unit[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public CreateUnit(unit:Unit){
    var url=this._defaultRoute.InventoryService+'unit';
    return this._httpClient.post<Unit>(url,unit).pipe(
      catchError(this.handleError)
    )
  }
  public UpdateUnit(unit:Unit){
    var url=this._defaultRoute.InventoryService+'unit/'+unit.Id;
    return this._httpClient.put(url,unit).pipe(
      catchError(this.handleError)
    )
  }
  public getUnitById(Id:string){
    var url=this._defaultRoute.InventoryService+'unit/'+Id;
    return this._httpClient.get<Unit>(url).pipe(
      catchError(this.handleError)
    )
  }
  public deleteUnit(Id:string){
    var url=this._defaultRoute.InventoryService+'unit/'+Id;
    return this._httpClient.delete(url).pipe(
      catchError(this.handleError)
    )
  }
  public getCategoryList(){
    var url=this._defaultRoute.InventoryService+'categories';
    return this._httpClient.get<Category[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public CreateCategory(category:Category){
    var url=this._defaultRoute.InventoryService+'category';
    return this._httpClient.post<Category>(url,category).pipe(
      catchError(this.handleError)
    )
  }
  public UpdateCategory(category:Category){
    var url=this._defaultRoute.InventoryService+'category/'+category.Id;
    return this._httpClient.put(url,category).pipe(
      catchError(this.handleError)
    )
  }
  public getCategoryById(Id:string){
    var url=this._defaultRoute.InventoryService+'category/'+Id;
    return this._httpClient.get<Category>(url);
  }
  public deleteCategory(Id:string){
    var url=this._defaultRoute.InventoryService+'category/'+Id;
    return this._httpClient.delete(url).pipe(
      catchError(this.handleError)
    )
  }
  public getSubCategoryList(){
    var url=this._defaultRoute.InventoryService+'subcategories';
    return this._httpClient.get<Subcategory[]>(url)
    .pipe(
      catchError(this.handleError)
    )
  }
  public CreateSubCategory(subcategory:Subcategory){
    var url=this._defaultRoute.InventoryService+'subcategory';
    return this._httpClient.post<Subcategory>(url,subcategory).pipe(
      catchError(this.handleError)
    )
  }
  public UpdateSubCategory(subcategory:Subcategory){
    var url=this._defaultRoute.InventoryService+'subcategory/'+subcategory.Id;
    return this._httpClient.put(url,subcategory).pipe(
      catchError(this.handleError)
    )
  }
  public getSubCategoryById(Id:string){
    var url=this._defaultRoute.InventoryService+'subcategory/'+Id;
    return this._httpClient.get<Subcategory>(url).pipe(
      catchError(this.handleError)
    )
  }
  public deleteSubCategory(Id:string){
    var url=this._defaultRoute.InventoryService+'subcategory/'+Id;
    return this._httpClient.delete(url).pipe(
      catchError(this.handleError)
    )
  }
 
  public getInventoryItemList(){
    var url=this._defaultRoute.InventoryService+'InventoryItems';
    return this._httpClient.get<InventoryItem[]>(url)
    .pipe(
      catchError(this.handleError)
    )
  }
  public CreateInventoryItem(inventoryItem:InventoryItem){
    var url=this._defaultRoute.InventoryService+'InventoryItem';
    return this._httpClient.post<InventoryItem>(url,inventoryItem).pipe(
      catchError(this.handleError)
    )
  }
  public UpdateInventoryItem(inventoryItem:InventoryItem){
    var url=this._defaultRoute.InventoryService+'InventoryItem/'+inventoryItem.Id;
    return this._httpClient.put(url,inventoryItem).pipe(
      catchError(this.handleError)
    )
  }
  public getInventoryItemById(Id:string){
    var url=this._defaultRoute.InventoryService+'InventoryItem/'+Id;
    return this._httpClient.get<InventoryItem>(url).pipe(
      catchError(this.handleError)
    )
  }
  public deleteInventoryItem(Id:string){
    var url=this._defaultRoute.InventoryService+'InventoryItem/'+Id;
    return this._httpClient.delete(url).pipe(
      catchError(this.handleError)
    )
  }
  public getSupplierList(){
    var url=this._defaultRoute.InventoryService+'Suppliers';
     return this._httpClient.get<Supplier[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public CreateSupplier(supplier:Supplier){
    var url=this._defaultRoute.InventoryService+'Supplier';
    return this._httpClient.post<Supplier>(url,supplier).pipe(
      catchError(this.handleError)
    )
  }
  public UpdateSupplier(supplier:Supplier){
    var url=this._defaultRoute.InventoryService+'Supplier/'+supplier.Id;
    return this._httpClient.put(url,supplier).pipe(
      catchError(this.handleError)
    )
  }
  public getSupplierById(Id:string){
    var url=this._defaultRoute.InventoryService+'Supplier/'+Id;
    return this._httpClient.get<Supplier>(url).pipe(
      catchError(this.handleError)
    )
  }
  public deleteSupplier(Id:string){
    var url=this._defaultRoute.InventoryService+'Supplier/'+Id;
    return this._httpClient.delete(url).pipe(
      catchError(this.handleError)
    )
  }
  public getManufactureList(){
    var url=this._defaultRoute.InventoryService+'Manufactures';
    return this._httpClient.get<Manufacture[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public CreateManufacture(manufacture:Manufacture){
    var url=this._defaultRoute.InventoryService+'Manufacture';
    return this._httpClient.post<Manufacture>(url,manufacture).pipe(
      catchError(this.handleError)
    )
  }
  public UpdateManufacture(manufacture:Manufacture){
    var url=this._defaultRoute.InventoryService+'Manufacture/'+manufacture.Id;
    return this._httpClient.put(url,manufacture).pipe(
      catchError(this.handleError)
    )
  }
  public getManufactureById(Id:string){
    var url=this._defaultRoute.InventoryService+'Manufacture/'+Id;
    return this._httpClient.get<Manufacture>(url).pipe(
      catchError(this.handleError)
    )
  }
  public deleteManufacture(Id:string){
    var url=this._defaultRoute.InventoryService+'Manufacture/'+Id;
    return this._httpClient.delete(url).pipe(
      catchError(this.handleError)
    )
  }
  public getPartyList(){
    var url=this._defaultRoute.InventoryService+'Partys';
    return this._httpClient.get<Party[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public CreateParty(party:Party){
    var url=this._defaultRoute.InventoryService+'Party';
    return this._httpClient.post<Party>(url,party).pipe(
      catchError(this.handleError)
    )
  }
  public UpdateParty(party:Party){
    var url=this._defaultRoute.InventoryService+'Party/'+party.Id;
    return this._httpClient.put(url,party).pipe(
      catchError(this.handleError)
    )
  }
  public getPartyById(Id:string){
    var url=this._defaultRoute.InventoryService+'Party/'+Id;
    return this._httpClient.get<Party>(url).pipe(
      catchError(this.handleError)
    )
  }
  public deleteParty(Id:string){
    var url=this._defaultRoute.InventoryService+'Party/'+Id;
    return this._httpClient.delete(url).pipe(
      catchError(this.handleError)
    )
  }
  public getCustomerList(){
    var url=this._defaultRoute.InventoryService+'Customers';
    return this._httpClient.get<Customer[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public CreateCustomer(customer:Customer){
    var url=this._defaultRoute.InventoryService+'Customer';
    return this._httpClient.post<Customer>(url,customer).pipe(
      catchError(this.handleError)
    )
  }
  public UpdateCustomer(customer:Customer){
    var url=this._defaultRoute.InventoryService+'Customer/'+customer.Id;
    return this._httpClient.put(url,customer).pipe(
      catchError(this.handleError)
    )
  }
  public getCustomerById(Id:string){
    var url=this._defaultRoute.InventoryService+'Customer/'+Id;
    return this._httpClient.get<Customer>(url).pipe(
      catchError(this.handleError)
    )
  }
  public deleteCustomer(Id:string){
    var url=this._defaultRoute.InventoryService+'Customer/'+Id;
    return this._httpClient.delete(url).pipe(
      catchError(this.handleError)
    )
  }
  public GetSettingSellPrice(priceSettingMethod:string){
    var url=this._defaultRoute.InventoryService+'settingSellPrice/'+priceSettingMethod;
    return this._httpClient.get<SettingSellprice[]>(url).pipe(
      catchError(this.handleError)
    )
  }
  public SaveSettingSellPrice(sellprices:SettingSellprice[]){
    var url=this._defaultRoute.InventoryService+'settingSellPrice';
    return this._httpClient.post<boolean>(url,sellprices).pipe(
      catchError(this.handleError)
    )
  }
}
