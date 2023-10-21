import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musician } from 'src/app/core/models/musician';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class ListService extends CrudService<Musician> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/musician`);
  }

  getAllUsers(filters?: any): Observable<Musician[]> {
    return this.getAll(filters);
  }
}
