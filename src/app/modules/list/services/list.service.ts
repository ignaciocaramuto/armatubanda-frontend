import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Musician } from 'src/app/core/models/musician';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly baseUrl: string = environment.apiUrl;

  private http = inject(HttpClient);

  getAllUsers(): Observable<Musician[]> {
    return this.http.get<Musician[]>(`${this.baseUrl}/musician`)
  }

  getUser(id: number): Observable<Musician> {
    return of({
      id: 1,
      firstname: 'Fabricio',
      lastname: 'Gomez',
      role: 'Guitarrista',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
      image: 'https://i.ibb.co/9HD3gMf/img-random.png',
      rate: 4.5,
      opinions: 15
    });
  }
}
