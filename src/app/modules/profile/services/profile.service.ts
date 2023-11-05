import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Musician } from 'src/app/core/models/musician';
import { Review } from 'src/app/core/models/review.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { environment } from 'src/environments/environment.local';

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
      tap(() => {
        this._logMessageService.logConfirm('¡Tu reseña ha sido añadida!');
      }),
      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      )
    );
  }
}
