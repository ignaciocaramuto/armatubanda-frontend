import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Musician } from 'src/app/core/models/musician';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private readonly baseUrl: string = environment.apiUrl;

  private http = inject(HttpClient);

  getAllUsers(filters?: any): Observable<Musician[]> {
    const params = this.buildQueryParams(filters);
    return this.http.get<Musician[]>(`${this.baseUrl}/musician/all`, {
      params,
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
