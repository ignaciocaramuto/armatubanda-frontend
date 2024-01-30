import { Genre } from 'src/app/core/models/genre.interface';
import { Image } from 'src/app/core/models/image.interface';
import { ContactInformation, Musician } from 'src/app/core/models/musician';
import { Review } from 'src/app/core/models/review.interface';

export interface Band {
  id: number;
  bandInfo: BandInfo;
  bandContactInfo: ContactInformation;
  image: Image;
  genres: Genre[];
  musicianLeader: Musician;
  members: Musician[];
  reviews: Review[];
}

export interface BandInfo {
  name: string;
  description: string;
  country: string;
  city: string;
  creationDate: Date;
}
