import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
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

  addGenre(name: string): Observable<Genre> {
    return this.http.post<Genre>(`${this.apiUrl}`, { name }).pipe(
      tap(() =>
        this._logMessageService.logConfirm('Género agregado correctamente!')
      ),
      catchError((res: HttpErrorResponse) =>
        throwError(() => {
          if (res.error)
            this._logMessageService.logServerError(res.error.message);
        })
      )
    );
  }
}
