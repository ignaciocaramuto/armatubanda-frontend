import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';
import { Application } from '../models/application.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService extends CrudService<Application> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/application`);
  }

  createApplication(adId: number, message: any): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/${adId}`, message).pipe(
      tap(() =>
        this._logMessageService.logConfirm('¡Tu solicitud ha sido enviada!')
      ),
      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      )
    );
  }

  accept(bandId: number, id: number): Observable<any> {
    return this.http
      .patch<any>(`${this.apiUrl}/accept/${bandId}/${id}`, {})
      .pipe(
        tap(() =>
          this._logMessageService.logConfirm('¡Miembro aceptado correctamente!')
        ),
        catchError((res: HttpErrorResponse) =>
          throwError(() =>
            this._logMessageService.logServerError(res.error.message)
          )
        )
      );
  }

  reject(bandId: number, id: number): Observable<any> {
    return this.http
      .patch<any>(`${this.apiUrl}/reject/${bandId}/${id}`, {})
      .pipe(
        tap(() =>
          this._logMessageService.logConfirm(
            '¡Miembro rechazado correctamente!'
          )
        ),
        catchError((res: HttpErrorResponse) =>
          throwError(() =>
            this._logMessageService.logServerError(res.error.message)
          )
        )
      );
  }
}
