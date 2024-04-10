import { Genre } from 'src/app/core/models/genre.interface';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { Band } from '../../band/models/band.interface.js';
import { Application } from '../../band/models/application.interface.js';
import { AdvertisementStatus } from '../enums/advertisementStatus.enum.js';

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  genres: Genre[];
  instruments: Instrument[];
  applications: Application[];
  band: Band;
  status: AdvertisementStatus;
}
