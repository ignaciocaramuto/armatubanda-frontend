import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Musician } from 'src/app/core/models/musician';
import { ProfileInfo } from 'src/app/core/models/profileInfo.interface';
import { Review } from 'src/app/core/models/review.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { environment } from 'src/environments/environment.local';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends CrudService<Musician> {
  private _logMessageService = inject(LogMessageService);

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/musician`);
  }

  postReview(review: Review): Observable<Review[]> {
    return this.http.put<Review[]>(`${this.apiUrl}/upload-review`, review).pipe(
      tap(() =>
        this._logMessageService.logConfirm('¡Tu reseña ha sido añadida!')
      ),
      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      )
    );
  }

  getProfileInfo(id: number): Observable<ProfileInfo> {
    return this.http.get<ProfileInfo>(
      `${this.apiUrl}/get-profile/information/${id}`
    );
  }

  addPost(post: Post): Observable<Post> {
    const headers = new HttpHeaders();
    if (post.image) {
      headers.set('Content-Type', 'multipart/form-data');
    }

    return this.http
      .post<Post>(`${this.apiUrl}/create-post`, post, { headers })
      .pipe(
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
}
