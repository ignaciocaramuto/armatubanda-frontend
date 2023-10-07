import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musician } from 'src/app/core/models/musician';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMusician(id: number): Observable<Musician> {
    return this.http.get<Musician>(`${this.baseUrl}/musician/${id}`);
  }
}
