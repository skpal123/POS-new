import {Input,Directive}from '@angular/core'
import {AsyncValidator,AbstractControl,NG_VALIDATORS, NG_ASYNC_VALIDATORS, ValidationErrors}from '@angular/forms'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomValidationServiceService } from '../../services/common/custom-validation-service.service';
@Directive({
selector:'[emailExistingValidator]',
providers:[{
    provide:NG_ASYNC_VALIDATORS,
    useExisting:EmailExistingCheckAsyncValidator,
    multi:true
},CustomValidationServiceService]
})
export class EmailExistingCheckAsyncValidator implements AsyncValidator{
    constructor(private _customValidationService:CustomValidationServiceService){}
validate(control:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null>{
    debugger
    return this._customValidationService.checkEmailDuplicate(control.value).pipe(
        map(users=>{
           return users==true?{'emailExists':true}:null
        })
    )
}
}