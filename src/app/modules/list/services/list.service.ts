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

  getAllUsers(): Observable<Musician[]> {
    let params = new HttpParams();
    return this.http.get<Musician[]>(`${this.baseUrl}/musician/all`, {
      params,
    });
  }
}
