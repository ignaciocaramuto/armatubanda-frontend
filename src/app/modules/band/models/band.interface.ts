import { Genre } from 'src/app/core/models/genre.interface';
import { Musician } from 'src/app/core/models/musician';
import { Comment } from 'src/app/core/models/comment.interface';
import { Post } from '../../profile/models/post.interface.js';
import { Advertisement } from '../../advertisements/models/advertisement.interface.js';

export interface Band {
  id: number;
  name: string;
  description: string;
  country: string;
  city: string;
  state: string;
  phoneNumber?: string;
  webSite?: string;
  socialMedia?: string;
  imagePath: string;
  genres: Genre[];
  leader: Musician;
  members: Musician[];
  comments?: Comment[];
  posts: Post[];
  advertisements: Advertisement[];
}
