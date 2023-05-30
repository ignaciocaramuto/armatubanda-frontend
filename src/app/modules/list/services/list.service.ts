import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  getAllUsers(): Observable<User[]> {
    return of([
      {
        id: 1,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 2,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 3,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 4,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 5,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 6,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 7,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 8,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 9,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 10,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 11,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 12,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 13,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 14,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 15,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 16,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      },
      {
        id: 17,
        firstname: 'Fabricio',
        lastname: 'Gomez',
        role: 'Guitarrista',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        image: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opinions: 15
      }
    ])
  }

  getUser(id: number): Observable<User> {
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
