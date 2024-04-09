import { MusicianStatusBand } from '../enums/musicianStatusBand.enum';
import { MusicianBands } from './musicianBands.interface';

export interface MusicianBandsStatus {
  id: number;
  name: string;
  imagePath: string;
  status: MusicianStatusBand;
}
