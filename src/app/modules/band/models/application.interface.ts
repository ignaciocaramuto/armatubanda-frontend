import { Musician } from 'src/app/core/models/musician.js';

export interface Application {
  id: number;
  message: string;
  createdAt: Date;
  status: string;
  applicant: Musician;
}
