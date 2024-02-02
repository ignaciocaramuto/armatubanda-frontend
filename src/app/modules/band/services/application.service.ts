import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';
import { Application } from '../models/application.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService extends CrudService<Application> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/application`);
  }

  changeApplicationStatus(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, data);
  }
}
