import { Component, OnInit, inject } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicProfile, Instrument, MusicianContactInformation } from '../../interfaces/profile-creation.interface';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss']
})
export class CreationFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  data: Instrument[] = [];

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
    instrumentList:['',[]]

  })

  ngOnInit(): void {
    this.getInstruments();
  }

  public onSubmit(){
    if(this.creationProfileForm.valid){
      const {firstName,lastName,stageName,country,city,phoneNumber,webSite,socialMediaWebSite,bio,instrumentList} = this.creationProfileForm.value;
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
      const instruments: Instrument[] = instrumentList;
      const basicInfo:BasicProfile = {
        musicianContactInformation: musicianContactObject,
        instruments:instruments
      }
      console.log(basicInfo);
      const urlPut = `${this.baseUrl}/musician/create-profile`
      console.log(this.http.put<BasicProfile>(urlPut,basicInfo));
    }
    else{
      console.log('There is an error');
    }
  }


  getInstruments(): void {
    const url = `${this.baseUrl}/instrument/all`;

    this.http.get<Instrument[]>(url).subscribe({

      next: (list) => {this.data = list;},
      error: (e) => console.log(e),
    }
    );
  }


}
