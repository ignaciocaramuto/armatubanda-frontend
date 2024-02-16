import {
  BiographyInformation,
  CareerInformation,
  EducationInformation,
  PreferenceInformation,
  SkillsInformation,
} from './musician';

export interface ProfileInfo {
  biographyInformation: BiographyInformation;
  careerInformation: CareerInformation;
  educationInformation: EducationInformation;
  skillsInformation: SkillsInformation;
  preferenceInformation: PreferenceInformation;
}
