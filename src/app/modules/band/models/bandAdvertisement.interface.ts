import { Genre } from 'src/app/core/models/genre.interface';
import { Band } from './band.interface';
import { Instrument } from 'src/app/core/models/instrument.interface';

export interface BandAdvertisement {
  id: number;
  description: string;
  band: Band;
  genres: Genre[];
  instruments: Instrument[];
  createdOn: Date;
}
