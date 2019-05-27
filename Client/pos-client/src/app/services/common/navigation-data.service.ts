import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationDataService {
  IsSaved:boolean;
  data:any
  constructor() { }
}
