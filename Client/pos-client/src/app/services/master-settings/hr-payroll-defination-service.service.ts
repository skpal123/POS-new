import { Injectable } from '@angular/core';
import { DefaultRouteService } from '../common/default-route.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Designation } from '../../models/master-settings/hr-payroll/designation.model';
import { Grade } from '../../models/master-settings/hr-payroll/grade.model';
import { SubGrade } from '../../models/master-settings/hr-payroll/sub-grade.model';
import { SalaryItem } from '../../models/master-settings/hr-payroll/salary-item.model';

@Injectable({
  providedIn: 'root'
})
export class HrPayrollDefinationServiceService {
  constructor(
    private _defaultRoute:DefaultRouteService,
    private _httpClient:HttpClient) 
    { }
  public getDesignationList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'Designations';
    return this._httpClient.get<Designation[]>(url)
  }
  public getDesignationById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'Designation/'+id;
    return this._httpClient.get<Designation>(url)
  }
  public CreateDesignation(designation:Designation){
    var url=this._defaultRoute.hrPayrollService+'Designation';
    return this._httpClient.post<Designation>(url,designation)

  }
  public UpdateDesignation(designation:Designation){
    var url=this._defaultRoute.hrPayrollService+'Designation/'+designation.Id;
    return this._httpClient.put(url,designation)
  }
  public DeleteDesignation(id:string){
    var url=this._defaultRoute.hrPayrollService+'Designation/'+id;
    return this._httpClient.delete(url)
  }
  public getGradeList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'Grades';
    return this._httpClient.get<Designation[]>(url)
  }
  public getGradeById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'Grade/'+id;
    return this._httpClient.get<Designation>(url)
  }
  public CreateGrade(grade:Grade){
    var url=this._defaultRoute.hrPayrollService+'Grade';
    return this._httpClient.post<Designation>(url,grade)

  }
  public UpdateGrade(grade:Grade){
    var url=this._defaultRoute.hrPayrollService+'Grade/'+grade.Id;
    return this._httpClient.put(url,grade)
  }
  public DeleteGrade(id:string){
    var url=this._defaultRoute.hrPayrollService+'Grade/'+id;
    return this._httpClient.delete(url)
  }
  public getSubGradeList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'SubGrades';
    return this._httpClient.get<SubGrade[]>(url)
  }
  public getSubGradeById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'SubGrade/'+id;
    return this._httpClient.get<SubGrade>(url)
  }
  public CreateSubGrade(subgrade:SubGrade){
    var url=this._defaultRoute.hrPayrollService+'SubGrade';
    return this._httpClient.post<SubGrade>(url,subgrade)

  }
  public UpdateSubGrade(subgrade:SubGrade){
    var url=this._defaultRoute.hrPayrollService+'SubGrade/'+subgrade.Id;
    return this._httpClient.put(url,subgrade)
  }
  public DeleteSubGrade(id:string){
    var url=this._defaultRoute.hrPayrollService+'SubGrade/'+id;
    return this._httpClient.delete(url)
  }
  public getSalaryItemList():Observable<any[]>{
    var url=this._defaultRoute.hrPayrollService+'SalaryItems';
    return this._httpClient.get<SalaryItem[]>(url)
  }
  public getSalaryItemById(id:string):Observable<any>{
    var url=this._defaultRoute.hrPayrollService+'SalaryItem/'+id;
    return this._httpClient.get<SalaryItem>(url)
  }
  public CreateSalaryItem(slaryItem:SalaryItem){
    var url=this._defaultRoute.hrPayrollService+'SalaryItem';
    return this._httpClient.post<SalaryItem>(url,slaryItem)

  }
  public UpdateSalaryItem(slaryItem:SalaryItem){
    var url=this._defaultRoute.hrPayrollService+'SalaryItem/'+slaryItem.Id;
    return this._httpClient.put(url,SalaryItem)
  }
  public DeleteSalaryItem(id:string){
    var url=this._defaultRoute.hrPayrollService+'SalaryItem/'+id;
    return this._httpClient.delete(url)
  }
}