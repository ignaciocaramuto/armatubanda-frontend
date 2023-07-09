import { Injectable } from '@angular/core';
import {FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {



  isValidField(registerForm: FormGroup<any>, field: string) {
    return registerForm.controls[field].errors && registerForm.controls[field].touched;
  }


  public isFieldOneEqualFieldTwo(field1:string,field2:string){

    return (formGroup:FormGroup) : ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if(fieldValue1 !== fieldValue2){
        formGroup.get(field2)?.setErrors({ notEqual: true});
        return { notEqual:true}
      }

      formGroup.get(field2)?.setErrors(null);
      return null;

    }



  }

}
