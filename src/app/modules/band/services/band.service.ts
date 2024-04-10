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
    super(http, `${environment.apiUrl}/band`);
  }

  leaveComment(id: number, comment: any): Observable<Comment[]> {
    return this.http
      .post<Comment[]>(`${environment.apiUrl}/comment/band/${id}`, { comment })
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

  leaveBand(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/leave/${id}`);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiUrl}/comment/band/${id}`);
  }
}
