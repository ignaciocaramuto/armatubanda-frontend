import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Musician } from 'src/app/core/models/musician';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';
import { MusicianBandsStatus } from 'src/app/core/models/musicianBandsStatus.interface';
import { Band } from '../../band/models/band.interface.js';
import { Comment } from 'src/app/core/models/comment.interface.js';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends CrudService<Musician> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/musician`);
  }

  leaveComment(id: number, comment: any): Observable<Comment[]> {
    return this.http
      .post<Comment[]>(`${environment.apiUrl}/comment/musician/${id}`, {
        comment,
      })
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

  getMusicianBands(id: number): Observable<Band[]> {
    return this.http.get<Band[]>(`${this.apiUrl}/${id}/bands`);
  }

  getMusicianLeaderBands(
    musicianId: number
  ): Observable<MusicianBandsStatus[]> {
    return this.http.get<MusicianBandsStatus[]>(
      `${this.apiUrl}/leader/${musicianId}`
    );
  }

  editProfile(data: FormData): Observable<Musician> {
    return this.http.put<Musician>(`${this.apiUrl}/edit`, data);
  }

  leaveBand(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/leave?bandId=${id}`);
  }

  getMoreInfo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/more-info/${id}`);
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${environment.apiUrl}/comment/musician/${id}`
    );
  }
}
