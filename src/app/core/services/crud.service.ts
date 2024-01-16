import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LogMessageService } from './log-message.service';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> {
  protected _logMessageService = inject(LogMessageService);

  constructor(
    protected http: HttpClient,
    @Inject(String) protected apiUrl: string
  ) {}

  getAll(params?: any): Observable<T[]> {
    const queryParams = this.buildQueryParams(params);
    return this.http.get<T[]>(this.apiUrl, {
      params: queryParams,
    });
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  create(data: T | FormData): Observable<T> {
    return this.http.post<T>(this.apiUrl, data).pipe(
      tap(() =>
        this._logMessageService.logConfirm('¡Entidad creada correctamente!')
      ),
      catchError((res: HttpErrorResponse) =>
        throwError(() => {
          if (res.error)
            this._logMessageService.logServerError(res.error.message);
        })
      )
    );
  }

  update(data: Partial<T>): Observable<T> {
    return this.http.put<T>(this.apiUrl, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buildQueryParams(filters: any): HttpParams {
    let params = new HttpParams();
    for (const key in filters) {
      if (filters.hasOwnProperty(key)) {
        if (filters[key]) {
          params = params.set(key, filters[key]);
        }
      }
    }
    return params;
  }
}
