import { Image } from 'src/app/core/models/image.interface';

export interface AuthUser {
  id: number;
  email: string;
  profileSet: boolean;
  firstName: string;
  lastName: string;
  profileImage: Image;
  emailVerified?: boolean;
}
