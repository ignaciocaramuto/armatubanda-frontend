import { ProfileImage } from 'src/app/core/models/profile-image.interface';

export interface LoginResponse {
  token: string;
  email: string;
  isProfileSet: string;
  firstName: string;
  lastName: string;
  profileImage: ProfileImage;
}
