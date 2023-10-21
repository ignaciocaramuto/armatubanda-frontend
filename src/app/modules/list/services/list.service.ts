import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musician } from 'src/app/core/models/musician';
import { CrudService } from 'src/app/core/services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class ListService extends CrudService<Musician[]> {
  getAllUsers(filters?: any): Observable<Musician[]> {
    return this.get('musician/all', filters);
  }
}
