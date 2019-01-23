import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultRouteService {
  constructor() { }
  securityService:string="http://localhost:1849//api/SecurityService/"
  administrationService:string="http://localhost:1849//api/AdministrationService/"
}
