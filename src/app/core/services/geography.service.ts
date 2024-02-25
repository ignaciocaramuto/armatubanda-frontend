import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeographyService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http
      .get<any>(
        'https://countriesnow.space/api/v0.1/countries/info?returns=currency'
      )
      .pipe(
        tap((result) =>
          result.data.sort((a: any, b: any) => a.name.localeCompare(b.name))
        )
      );
  }

  getStates(country: string): Observable<any> {
    return this.http.post<any>(
      'https://countriesnow.space/api/v0.1/countries/states',
      {
        country,
      }
    );
  }

  getCities(country: string, state: string): Observable<any> {
    return this.http
      .post<any>('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country,
        state,
      })
      .pipe(tap((result) => result.data.sort()));
  }

  getCitiesFromCountry(country: string): Observable<any> {
    return this.http
      .post<any>('https://countriesnow.space/api/v0.1/countries/cities', {
        country,
      })
      .pipe(tap((result) => result.data.sort()));
  }
}
