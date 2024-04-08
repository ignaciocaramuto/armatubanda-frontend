import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Post } from '../../profile/models/post.interface';
import { Comment } from 'src/app/core/models/comment.interface.js';
import { Band } from '../models/band.interface.js';

@Injectable({
  providedIn: 'root',
})
export class BandService extends CrudService<Band> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/bands`);
  }

  postReview(comment: any): Observable<Comment[]> {
    return this.http
      .put<Comment[]>(`${this.apiUrl}/upload-review`, comment)
      .pipe(
        tap(() =>
          this._logMessageService.logConfirm('¡Tu comentario ha sido añadido!')
        ),
        catchError((res: HttpErrorResponse) =>
          throwError(() =>
            this._logMessageService.logServerError(res.error.message)
          )
        )
      );
  }

  editProfile(data: FormData): Observable<Band> {
    return this.http.put<Band>(`${this.apiUrl}/edit`, data);
  }

  deleteBand(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() =>
        this._logMessageService.logConfirm('¡Banda eliminada correctamente!')
      ),
      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      )
    );
  }
}
