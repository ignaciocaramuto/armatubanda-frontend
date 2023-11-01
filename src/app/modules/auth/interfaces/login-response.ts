import { ProfileImage } from 'src/app/core/models/profile-image.interface';

export interface LoginResponse {
  id: number;
  token: string;
  email: string;
  isProfileSet: string;
  firstName: string;
  lastName: string;
  profileImage: ProfileImage;
}
