import { ProfileImage } from './profile-image.interface';

export interface Review {
  id?: number;
  comment?: string;
  musicianId?: number;
  reviewerId?: number;
  reviewerFirstName?: string;
  reviewerLastName?: string;
  reviewerProfileImage?: ProfileImage;
}
