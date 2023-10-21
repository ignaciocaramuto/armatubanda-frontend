import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> {
  constructor(
    private http: HttpClient,
    @Inject(String) private apiUrl: string
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

  create(data: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, data);
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
