import { ExperienceType } from '../enums/experienceType.enum';
import { Instrument } from './instrument.interface';
import { ProfileImage } from './profile-image.interface';
import { Review } from './review.interface';

export interface Musician {
  id: number;
  personalInformation: PersonalInformation;
  contactInformation: ContactInformation;
  skillsInformation: SkillsInformation;
  educationInformation: EducationInformation;
  careerInformation: CareerInformation;
  biographyInformation: BiographyInformation;
  preferenceInformation: PreferenceInformation;
  profileImage: ProfileImage;
  reviews: Review[];
}

export interface PersonalInformation {
  name: string;
  lastname: string;
  stageName: string;
  birthday: string;
  gender: string;
  country: string;
  city: string;
}

export interface ContactInformation {
  phoneNumber: string;
  webSite: string;
  socialMedia: string;
}

export interface SkillsInformation {
  instrumentExperience: InstrumentExperience[];
}

export interface InstrumentExperience {
  instrument: Instrument;
  experience: ExperienceType;
}

export interface EducationInformation {
  educationHistory: EducationHistory[];
}

export interface EducationHistory {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface CareerInformation {
  careerHistory: CareerHistory[];
}

export interface CareerHistory {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface BiographyInformation {
  bio: string;
}

export interface PreferenceInformation {
  lookingBands: boolean;
  lookingMusician: boolean;
  available: boolean;
}
