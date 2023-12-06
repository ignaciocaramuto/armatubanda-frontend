import {
  CareerInformation,
  EducationInformation,
  PreferenceInformation,
  SkillsInformation,
} from './musician';

export interface ProfileInfo {
  careerInformation: CareerInformation;
  educationInformation: EducationInformation;
  skillsInformation: SkillsInformation;
  preferenceInformation: PreferenceInformation;
}
