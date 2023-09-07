import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  BasicProfile,
  Instrument,
  MusicianContactInformation,
} from '../../interfaces/profile-creation.interface';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.scss'],
})
export class CreationFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);

  data: Instrument[] = [];

  public personalInfoForm: FormGroup = this.fb.group({
    firstName: ['martin', [Validators.required]],
    lastName: ['pereyra', [Validators.required]],
    stageName: ['tnc', []],
  });

  public locationForm: FormGroup = this.fb.group({
    country: ['argentina', []],
    city: ['rosario', []],
    phoneNumber: ['3416511155', []],
  });

  public instrumentForm: FormGroup = this.fb.group({
    instrumentList: ['', []],
  });

  public socialMediaForm: FormGroup = this.fb.group({
    webSite: ['wwwmp.com', []],
    socialMediaLink: ['wwwlinkedicom', []],
  });

  public bioForm: FormGroup = this.fb.group({
    bio: ['esta es mi bio', [Validators.maxLength(256)]],
  });

  ngOnInit(): void {
    this.getInstruments();
  }

  public onSubmit() {
    if (
      this.personalInfoForm.valid &&
      this.locationForm.valid &&
      this.instrumentForm.valid &&
      this.socialMediaForm.valid &&
      this.bioForm.valid
    ) {
      const { firstName, lastName, stageName } = this.personalInfoForm.value;

      const { country, city, phoneNumber } = this.locationForm.value;

      const { webSite, socialMediaLink } = this.socialMediaForm.value;

      const { instrumentList } = this.instrumentForm.value;

      const { bio } = this.bioForm.value;

      const musicianContactObject: MusicianContactInformation = {
        name: firstName,
        lastname: lastName,
        stageName: stageName,
        bio: bio,
        country: country,
        city: city,
        phoneNumber: phoneNumber,
        webSite: webSite,
        socialMediaLink: socialMediaLink,
      };
      const instruments: Instrument[] = instrumentList;
      const basicInfo: BasicProfile = {
        musicianContactInformation: musicianContactObject,
        instruments: instruments,
      };
      console.log(basicInfo);
      const urlPut = `${this.baseUrl}/musician/create-profile`;
      console.log(this.http.put<BasicProfile>(urlPut, basicInfo));
    } else {
      console.log('There is an error');
    }
  }

  getInstruments(): void {
    const url = `${this.baseUrl}/instrument/all`;

    this.http.get<Instrument[]>(url).subscribe({
      next: (list) => {
        this.data = list;
        console.log(this.data);
      },
      error: (e) => console.log(e),
    });
  }
}
