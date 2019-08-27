import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationDataService {
  IsSaved:boolean;
  data:any
  IsUpdate:boolean=false;
  CurrentData:any;
  PreviousData:any;
  constructor() { }
}
