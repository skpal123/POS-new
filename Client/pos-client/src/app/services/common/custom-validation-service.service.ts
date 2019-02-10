import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationServiceService {

  constructor(private http:Http) { }
  getEmail(email:string){
    const url="http://localhost:1065/api/My/getDepartment/"+email
    return this.http.get(url);
  }
}
