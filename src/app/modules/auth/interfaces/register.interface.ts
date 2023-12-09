import { Image } from 'src/app/core/models/image.interface';

export interface AuthUser {
  id: number;
  email: string;
  isProfileSet: string;
  firstName: string;
  lastName: string;
  profileImage: Image;
}
