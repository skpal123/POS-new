import {Input,Directive}from '@angular/core'
import {AsyncValidator,AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors}from '@angular/forms'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomValidationServiceService } from '../services/common/custom-validation-service.service';
import { NavigationDataService } from '../services/common/navigation-data.service';
@Directive({
selector:'[categoryCheck]',
providers:[{
    provide:NG_ASYNC_VALIDATORS,
    useExisting:CategoryExistingCheckAsyncValidator,
    multi:true
},CustomValidationServiceService]
})
export class CategoryExistingCheckAsyncValidator implements AsyncValidator{
    constructor(private _customValidationService:CustomValidationServiceService,
    private _navigationDataService:NavigationDataService){}
validate(control:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null>{
    debugger
    if(this._navigationDataService.IsUpdate){
        this._navigationDataService.IsUpdate=false;
        return null;
    }
    else if(control.value==this._navigationDataService.PreviousData){
        return null;
    }
    else {
        return this._customValidationService.checkCategoryIdDuplicate(control.value).pipe(
            map(users=>{
               // return users.json&&users.json().length>0?{'emailExists':true}:null
               return users==true?{'exists':true}:null
            })
        )
    }
}
}