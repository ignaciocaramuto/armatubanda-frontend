import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/core/models/genre.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class GenreService extends CrudService<Genre> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/genre`);
  }

  getGenres(): Observable<Genre[]> {
    return this.getAll();
  }

  addGenre(genre: Genre): Observable<Genre> {
    return this.create(genre);
  }
}
