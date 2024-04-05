import { Musician } from './musician.js';

export interface Comment {
  id?: number;
  comment?: string;
  author: Musician;
}
