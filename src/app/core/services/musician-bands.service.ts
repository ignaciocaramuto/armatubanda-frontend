import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { MusicianBands } from '../models/musicianBands.interface';

@Injectable({
  providedIn: 'root',
})
export class MusicianBandsService {
  constructor(private http: HttpClient) {}

  getMusicianBands(id?: number): Observable<MusicianBands[]> {
    return this.http.get<MusicianBands[]>(`${environment.apiUrl}/${id}/bands`);
  }
}
