import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Musician } from 'src/app/core/models/musician';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';
import { Post } from '../models/post.interface';
import { MusicianBands } from 'src/app/core/models/musicianBands.interface';
import { MusicianBandsStatus } from 'src/app/core/models/musicianBandsStatus.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends CrudService<Musician> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/musician`);
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

  addPost(post: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/create-post`, post).pipe(
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

  getPosts(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/get-post/${id}`);
  }

  getMusicianBands(id: number): Observable<MusicianBands[]> {
    return this.http.get<MusicianBands[]>(`${this.apiUrl}/${id}/bands`);
  }

  getMusicianLeaderBands(id?: number): Observable<MusicianBandsStatus[]> {
    return this.http.get<MusicianBandsStatus[]>(
      `${this.apiUrl}/${id}/leader/bands`
    );
  }

  editProfile(data: FormData): Observable<Musician> {
    return this.http.put<Musician>(`${this.apiUrl}/edit`, data);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-post/${id}`);
  }

  leaveBand(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/leave?bandId=${id}`);
  }
}
