import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultRouteService {
  constructor() { }
  securityService:string="http://localhost:1849//api/SecurityService/"
  administrationService:string="http://localhost:1849//api/AdministrationService/";
  InventoryService:string="http://localhost:1849//api/InventoryService/"
  DropdownService:string="http://localhost:1849//api/DropdownService/"
  FinanceService:string="http://localhost:1849//api/FinanceService/"
}
