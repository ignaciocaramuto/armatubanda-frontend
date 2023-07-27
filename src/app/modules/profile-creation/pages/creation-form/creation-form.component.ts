import { Component, inject } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MusicianContactInformation } from '../../interfaces/profile-creation.interface';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss']
})
export class CreationFormComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  public creationProfileForm : FormGroup = this.fb.group({
    firstName:['martin',[Validators.required]],
    lastName:['pereyra',[Validators.required]],
    stageName:['tnc',[]],
    country:['argentina',[]],
    city:['rosario',[]],
    phoneNumber:['3416511155',[]],
    webSite:['wwwmp.com',[]],
    socialMediaWebSite:['wwwlinkedicom',[]],
    bio:['esta es mi bio',[Validators.maxLength(256)]],

  })

  public onSubmit(){
    if(this.creationProfileForm.valid){
      const {firstName,lastName,stageName,country,city,phoneNumber,webSite,socialMediaWebSite,bio} = this.creationProfileForm.value;
      const musicianContactObject:MusicianContactInformation = {
        name: firstName,
        lastname: lastName, 
        stageName: stageName,
        bio: bio,
        country: country,  
        city: city,
        phoneNumber: phoneNumber,     
        webSite: webSite,
        socialMediaLink: socialMediaWebSite
      }
      this.router.navigate(['./new-profile/add-instruments'], { state: musicianContactObject});
    }
    else{
      console.log('There is an error');
    }
  }

}
