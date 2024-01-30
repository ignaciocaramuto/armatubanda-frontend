import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';
import { Band } from '../models/band.interface';
import { BandProfile } from '../models/bandProfile.interface';

@Injectable({
  providedIn: 'root',
})
export class BandService extends CrudService<BandProfile> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/bands`);
  }
}
