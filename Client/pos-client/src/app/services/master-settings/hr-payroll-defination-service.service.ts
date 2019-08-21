import { Injectable } from '@angular/core';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from '../../models/master-settings/hr-payroll/designation.model';

@Injectable({
  providedIn: 'root'
})
export class HrPayrollDefinationServiceService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
  public getDesignationList():Observable<any[]>{
    debugger
    var url=this._defaultRoute.InventoryService+'designations';
    return this._httpClient.get<Designation[]>(url)
  }
  public CreateDesignation(designation:Designation){
    var url=this._defaultRoute.InventoryService+'Designation';
    return this._httpClient.post<Designation>(url,designation)
    
  }
  public UpdateDesignation(designation:Designation){
    var url=this._defaultRoute.InventoryService+'Designation/'+designation.Id;
    return this._httpClient.put(url,location)
  }
}
