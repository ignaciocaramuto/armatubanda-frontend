import { ContactInformation } from 'src/app/core/models/musician';
import { BandInfo } from './band.interface';
import { Image } from 'src/app/core/models/image.interface';
import { Post } from '../../profile/models/post.interface';
import { Review } from 'src/app/core/models/review.interface';

export interface BandProfile {
  id: number;
  bandInfo: BandInfo;
  bandContactInfo: ContactInformation;
  leader: BandMember;
  bandProfileImage: Image;
  bandGenres: string[];
  posts: Post[];
  comments: Review[];
  bandMembersList: BandMember[];
}

export interface BandMember {
  musicianId: number;
  musicianName: string;
  musicianLastName: string;
  musicianProfileImage: Image;
}
