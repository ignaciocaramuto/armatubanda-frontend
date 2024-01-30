import { MusicianStatusBand } from '../enums/musicianStatusBand.enum';
import { MusicianBands } from './musicianBands.interface';

export interface MusicianBandsStatus {
  musicianBandsDto: MusicianBands;
  status: MusicianStatusBand;
}
