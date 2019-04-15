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

@Injectable({
  providedIn: 'root'
})
export class InventoryDefinationServiceService {

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
  public getLocationList(){
    var url=this._defaultRoute.InventoryService+'locations';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateLocation(location:InventoryLocation){
    var url=this._defaultRoute.InventoryService+'location';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,location,options);
  }
  public UpdateLocation(location:InventoryLocation){
    var url=this._defaultRoute.InventoryService+'location/'+location.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,location,options);
  }
  public getLocationById(Id:string){
    var url=this._defaultRoute.InventoryService+'location/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public deleteLocation(Id:string){
    var url=this._defaultRoute.InventoryService+'location/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
  public getUnitList(){
    var url=this._defaultRoute.InventoryService+'units';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateUnit(unit:Unit){
    var url=this._defaultRoute.InventoryService+'unit';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,unit,options);
  }
  public UpdateUnit(unit:Unit){
    var url=this._defaultRoute.InventoryService+'unit/'+unit.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,unit,options);
  }
  public getUnitById(Id:string){
    var url=this._defaultRoute.InventoryService+'unit/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public deleteUnit(Id:string){
    var url=this._defaultRoute.InventoryService+'unit/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
  public getCategoryList(){
    var url=this._defaultRoute.InventoryService+'categories';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateCategory(category:Category){
    var url=this._defaultRoute.InventoryService+'category';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,category,options);
  }
  public UpdateCategory(category:Category){
    var url=this._defaultRoute.InventoryService+'category/'+category.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,category,options);
  }
  public getCategoryById(Id:string){
    var url=this._defaultRoute.InventoryService+'category/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public deleteCategory(Id:string){
    var url=this._defaultRoute.InventoryService+'category/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
  public getSubCategoryList(){
    var url=this._defaultRoute.InventoryService+'subcategories';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateSubCategory(subcategory:Subcategory){
    var url=this._defaultRoute.InventoryService+'subcategory';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,subcategory,options);
  }
  public UpdateSubCategory(subcategory:Subcategory){
    var url=this._defaultRoute.InventoryService+'subcategory/'+subcategory.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,subcategory,options);
  }
  public getSubCategoryById(Id:string){
    var url=this._defaultRoute.InventoryService+'subcategory/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public deleteSubCategory(Id:string){
    var url=this._defaultRoute.InventoryService+'subcategory/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
 
  public getInventoryItemList(){
    var url=this._defaultRoute.InventoryService+'InventoryItems';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateInventoryItem(subcategory:Subcategory){
    var url=this._defaultRoute.InventoryService+'InventoryItem';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,subcategory,options);
  }
  public UpdateInventoryItem(subcategory:Subcategory){
    var url=this._defaultRoute.InventoryService+'InventoryItem/'+subcategory.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,subcategory,options);
  }
  public getInventoryItemById(Id:string){
    var url=this._defaultRoute.InventoryService+'InventoryItem/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public deleteInventoryItem(Id:string){
    var url=this._defaultRoute.InventoryService+'InventoryItem/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
  public getSupplierList(){
    var url=this._defaultRoute.InventoryService+'Suppliers';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateSupplier(supplier:Supplier){
    var url=this._defaultRoute.InventoryService+'Supplier';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,supplier,options);
  }
  public UpdateSupplier(supplier:Supplier){
    var url=this._defaultRoute.InventoryService+'Supplier/'+supplier.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,supplier,options);
  }
  public getSupplierById(Id:string){
    var url=this._defaultRoute.InventoryService+'Supplier/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public deleteSupplier(Id:string){
    var url=this._defaultRoute.InventoryService+'Supplier/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
  public getManufactureList(){
    var url=this._defaultRoute.InventoryService+'Manufactures';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateManufacture(manufacture:Manufacture){
    var url=this._defaultRoute.InventoryService+'Manufacture';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,manufacture,options);
  }
  public UpdateManufacture(manufacture:Manufacture){
    var url=this._defaultRoute.InventoryService+'Manufacture/'+manufacture.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,manufacture,options);
  }
  public getManufactureById(Id:string){
    var url=this._defaultRoute.InventoryService+'Manufacture/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public deleteManufacture(Id:string){
    var url=this._defaultRoute.InventoryService+'Manufacture/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
  public getPartyList(){
    var url=this._defaultRoute.InventoryService+'Partys';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateParty(party:Party){
    var url=this._defaultRoute.InventoryService+'Party';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,party,options);
  }
  public UpdateParty(party:Party){
    var url=this._defaultRoute.InventoryService+'Party/'+party.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,party,options);
  }
  public getPartyById(Id:string){
    var url=this._defaultRoute.InventoryService+'Party/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public deleteParty(Id:string){
    var url=this._defaultRoute.InventoryService+'Party/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
  public getCustomerList(){
    var url=this._defaultRoute.InventoryService+'Customers';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options)
  }
  public CreateCustomer(party:Party){
    var url=this._defaultRoute.InventoryService+'Customer';
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'POST');  
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url,party,options);
  }
  public UpdateCustomer(party:Party){
    var url=this._defaultRoute.InventoryService+'Customer/'+party.Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'PUT');  
    const options = new RequestOptions({ headers: headers });
    return this._http.put(url,party,options);
  }
  public getCustomerById(Id:string){
    var url=this._defaultRoute.InventoryService+'Customer/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'get');  
    const options = new RequestOptions({ headers: headers });
    return this._http.get(url,options);
  }
  public deleteCustomer(Id:string){
    var url=this._defaultRoute.InventoryService+'Customer/'+Id;
    let headers =  this.setCustomHeader();
    headers.append('ActionName', 'delete');  
    const options = new RequestOptions({ headers: headers });
    return this._http.delete(url,options);
  }
}
