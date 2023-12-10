import { Instrument } from 'src/app/core/models/instrument.interface';

export interface BasicProfile {
  musicianContactInformation: MusicianContactInformation;
  instruments: Instrument[];
}

export interface MusicianContactInformation {
  name: string;
  lastname: string;
  stageName: string;
  bio: string;
  country: string;
  city: string;
  phoneNumber: string;
  webSite: string;
  socialMediaLink: string;
}
