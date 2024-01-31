import { Genre } from 'src/app/core/models/genre.interface';
import { Image } from 'src/app/core/models/image.interface';
import { Instrument } from 'src/app/core/models/instrument.interface';

export interface Advertisement {
  adId: number;
  adName: string;
  description: string;
  bandId: number;
  genres: Genre[];
  instruments: Instrument[];
  bandImage: Image;
}
