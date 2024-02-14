import { Image } from 'src/app/core/models/image.interface';

export interface Post {
  id: number;
  videoUrl: string;
  image: Image;
  createdOn: Date;
}
