import { Genre } from 'src/app/core/models/genre.interface';
import { Image } from 'src/app/core/models/image.interface';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { AdvertisementStatus } from '../enums/advertisementStatus.enum';

export interface Advertisement {
  adId: number;
  adName: string;
  bandName: string;
  description: string;
  bandId: number;
  genres: Genre[];
  instruments: Instrument[];
  bandImage: Image;
  status: AdvertisementStatus;
}
