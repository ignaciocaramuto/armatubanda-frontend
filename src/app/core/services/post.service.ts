import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { Post } from '../../modules/profile/models/post.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LogMessageService } from './log-message.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = `${environment.apiUrl}/post`;

  constructor(
    private http: HttpClient,
    private _logMessageService: LogMessageService
  ) {}

  getAllFromMusician(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/musician/${id}`);
  }

  getAllFromBand(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/band/${id}`);
  }

  createForMusician(post: any): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/musician`, post).pipe(
      tap(() =>
        this._logMessageService.logConfirm('¡Tu posteo ha sido añadido!')
      ),
      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      )
    );
  }

  createForBand(post: any, id: number): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/band/${id}`, post).pipe(
      tap(() =>
        this._logMessageService.logConfirm('¡Tu posteo ha sido añadido!')
      ),
      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      )
    );
  }

  deleteForMusician(postId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/musician/${postId}`).pipe(
      tap(() =>
        this._logMessageService.logConfirm('¡Tu posteo ha sido eliminado!')
      ),
      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      )
    );
  }

  deleteForBand(bandId: number, postId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/band/${bandId}/${postId}`)
      .pipe(
        tap(() =>
          this._logMessageService.logConfirm('¡Tu posteo ha sido eliminado!')
        ),
        catchError((res: HttpErrorResponse) =>
          throwError(() =>
            this._logMessageService.logServerError(res.error.message)
          )
        )
      );
  }
}
