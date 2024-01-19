import { Musician } from 'src/app/core/models/musician';
import { Band } from '../../band/models/band.interface';

export interface Invitation {
  id: number;
  musicianInvited: Musician;
  bandInvitation: Band;
  status: boolean;
}

export interface InvitationRequest {
  musicianId: number;
  bandId: number;
}
