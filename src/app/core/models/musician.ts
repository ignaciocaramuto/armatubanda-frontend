import { Application } from 'src/app/modules/band/models/application.interface.js';
import { Band } from 'src/app/modules/band/models/band.interface.js';
import { Post } from 'src/app/modules/profile/models/post.interface.js';
import { Genre } from './genre.interface.js';
import { Instrument } from './instrument.interface.js';
import { Role } from '../enums/role.enum.js';
import { Experience } from '../enums/experience.enum.js';
import { Carrer } from './carrer.interface.js';
import { Comment } from './comment.interface.js';

export class Musician {
  id!: number;
  email!: string;
  password!: string;
  role!: Role;
  isProfileSet!: boolean;
  firstName?: string;
  lastName?: string;
  stageName?: string;
  birthday?: Date;
  country!: string;
  state!: string;
  city!: string;
  phoneNumber?: string;
  webSite?: string;
  socialMedia?: string;
  instruments!: Instrument[];
  genres!: Genre[];
  experience?: Experience;
  career?: Carrer[];
  bands?: Band[];
  bio?: string;
  lookingBands?: boolean;
  imagePath!: string;
  comments?: Comment[];
  writtenComments?: Comment[];
  posts?: Post[];
  applications?: Application[];
}
