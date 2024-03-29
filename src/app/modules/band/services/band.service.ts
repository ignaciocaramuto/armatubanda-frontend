import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';
import { BandProfile } from '../models/bandProfile.interface';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Post } from '../../profile/models/post.interface';
import { Review } from 'src/app/core/models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class BandService extends CrudService<BandProfile> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/bands`);
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

  postReview(review: Review): Observable<Review[]> {
    return this.http.put<Review[]>(`${this.apiUrl}/upload-review`, review).pipe(
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

  editProfile(data: FormData): Observable<BandProfile> {
    return this.http.put<BandProfile>(`${this.apiUrl}/edit`, data);
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

  deletePost(bandId: number, postId: number): Observable<string> {
    return this.http
      .delete<string>(`${this.apiUrl}/delete-post/${bandId}/${postId}`)
      .pipe(
        tap(() =>
          this._logMessageService.logConfirm('¡Post eliminado correctamente!')
        ),
        catchError((res: HttpErrorResponse) =>
          throwError(() =>
            this._logMessageService.logServerError(res.error.message)
          )
        )
      );
  }
}
