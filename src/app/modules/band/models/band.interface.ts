import { Genre } from 'src/app/core/models/genre.interface';
import { Image } from 'src/app/core/models/image.interface';
import { ContactInformation } from 'src/app/core/models/musician';

export interface Band {
  id: number;
  bandInfo: BandInfo;
  contactInformation: ContactInformation;
  leaderName: string;
  bandProfileImage: Image;
  bandGenres: Genre[];
}

export interface BandInfo {
  name: string;
  description: string;
  country: string;
  city: string;
  creationDate: Date;
}
