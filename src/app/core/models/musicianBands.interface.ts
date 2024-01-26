import { Image } from './image.interface';

export interface MusicianBands {
  musicianBandsDto: musicianBandsDto;
  status: string;
}

export interface musicianBandsDto {
  bandId: number;
  bandName: string;
  bandImage: Image;
}
