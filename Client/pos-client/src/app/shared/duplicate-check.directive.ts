import {Validator,NG_VALIDATORS,AbstractControl, ValidationErrors, AsyncValidator} from '@angular/forms'
import {Input,Directive} from '@angular/core'
import { CommonService } from '../services/common/common.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Directive({
    selector:'[DuplicateCheck]',
    providers:[{
            provide:NG_VALIDATORS,
            useExisting:DuplicateCheckDirective,
            multi:true
        }]
})
export class DuplicateCheckDirective implements AsyncValidator{
    @Input() data:string;
    constructor(private _commonService:CommonService)
    {}
    validate(control:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null>{
        debugger
        let index=this.data.indexOf('-');
        if(index!=0){
            let array=this.data.split('-')
            return this._commonService.getDuplicateById(array[0],array[1],control.value).pipe(
                map(response=>{
                   // return users.json&&users.json().length>0?{'emailExists':true}:null
                   return response&&response!=0&&response!=4?{'exists':true}:null
                })
            )
        }
        else{
            return null
        }
    }
}