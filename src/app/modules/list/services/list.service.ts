import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  getAllUsers(): Observable<any[]> {
    return of([
      {
        id: 1,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 2,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 3,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 4,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 5,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 6,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 7,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 8,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 9,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 10,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 11,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 12,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 13,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 14,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 15,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 16,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      },
      {
        id: 17,
        nombre: 'Fabricio',
        apellido: 'Gomez',
        rol: 'Guitarrista',
        descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
        img: 'https://i.ibb.co/9HD3gMf/img-random.png',
        rate: 4.5,
        opiniones: 15
      }
    ])
  }
}
