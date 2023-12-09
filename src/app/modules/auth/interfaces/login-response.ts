import { Image } from 'src/app/core/models/image.interface';

export interface LoginResponse {
  id: number;
  token: string;
  email: string;
  isProfileSet: string;
  firstName: string;
  lastName: string;
  profileImage: Image;
}
