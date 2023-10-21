import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class CrudService<T> {
  private readonly baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);

  get(endpoint: string, params?: any): Observable<T> {
    const queryParams = this.buildQueryParams(params);
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      params: queryParams,
    });
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
