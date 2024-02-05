import { ContactInformation } from 'src/app/core/models/musician';
import { BandInfo } from './band.interface';
import { Image } from 'src/app/core/models/image.interface';
import { Post } from '../../profile/models/post.interface';
import { Review } from 'src/app/core/models/review.interface';

export interface BandProfile {
  bandId: number;
  bandInfo: BandInfo;
  bandContactInfo: ContactInformation;
  leader: BandMember;
  bandProfileImage: Image;
  bandGenres: string[];
  postList: Post[];
  reviewsList: Review[];
  bandMembersList: BandMember[];
}

export interface BandMember {
  musicianId: number;
  musicianName: string;
  musicianLastName: string;
  musicianProfileImage: Image;
}
