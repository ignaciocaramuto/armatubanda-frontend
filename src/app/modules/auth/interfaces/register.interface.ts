import { ProfileImage } from 'src/app/core/models/profile-image.interface';

export interface AuthUser {
  id: number;
  email: string;
  isProfileSet: string;
  firstName: string;
  lastName: string;
  profileImage: ProfileImage;
}
