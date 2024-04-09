import { Musician } from 'src/app/core/models/musician';
import { Band } from '../../band/models/band.interface';

export interface Invitation {
  id: number;
  status: boolean;
  musician: Musician;
  band: Band;
}

export interface InvitationRequest {
  musicianId: number;
  bandId: number;
}
