import {Directive}from '@angular/core'
import {AsyncValidator,AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors}from '@angular/forms'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from '../../services/common/common.service';
import { NavigationDataService } from '../../services/common/navigation-data.service';
import { DuplicateCheck } from '../../models/common/duplicate-check.model';
@Directive({
selector:'[subgradeCheck]',
providers:[{
    provide:NG_ASYNC_VALIDATORS,
    useExisting:EmployeeSubGradeExistingCheckAsyncValidator,
    multi:true
},CommonService]
})
export class EmployeeSubGradeExistingCheckAsyncValidator implements AsyncValidator{
    duplicatecheck:DuplicateCheck={ItemName:null,TableName:null,value:null}
    constructor(private _commonService:CommonService,
        private _navigationDataService:NavigationDataService){}
    validate(control:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null>{
        debugger
        this.duplicatecheck.TableName="EmployeeSubGrade"
        this.duplicatecheck.ItemName="subgradeId"
        this.duplicatecheck.value=control.value
        if(this._navigationDataService.IsUpdate){
            this._navigationDataService.IsUpdate=false;
            return null;
        }
        else if(control.value==this._navigationDataService.PreviousData){
            return null;
        }
        else {
            return this._commonService.getDuplicateById(this.duplicatecheck).pipe(
                map(users=>{
                   // return users.json&&users.json().length>0?{'emailExists':true}:null
                   return users==true?{'exists':true}:null
                })
            )
        }
}
}