import { Image } from 'src/app/core/models/image.interface';

export interface Application {
  musicianImage: Image;
  applicationMessage: string;
  musicianId: number;
  musicianName: string;
  applicationId: number;
}
