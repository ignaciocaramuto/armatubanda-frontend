import { Component, inject } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss']
})
export class CreationFormComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  public creationProfileForm : FormGroup = this.fb.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]]
  })


  public onSubmit(){
    if(this.creationProfileForm.valid){
      console.log('Form submitted');
    }
    else{
      console.log('There is an error');
    }
  }

}
