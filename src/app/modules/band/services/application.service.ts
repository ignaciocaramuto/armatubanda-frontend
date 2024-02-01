import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';
import { Application } from '../models/application.interface';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService extends CrudService<Application> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/application`);
  }
}
