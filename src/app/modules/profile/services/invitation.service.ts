import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invitation, InvitationRequest } from '../models/invitation.interface';
import { environment } from 'src/environments/environment.local';
import { InvitationStatusDto } from '../models/InvitationStatusDto.interface';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  constructor(private http: HttpClient) {}

  createInvitation(invitation: InvitationRequest): Observable<Invitation> {
    return this.http.post<Invitation>(
      `${environment.apiUrl}/invitation/invite`,
      invitation
    );
  }

  getPendingInvitations(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(
      `${environment.apiUrl}/invitation/musician/pending`
    );
  }

  changeInvitationStatus(
    invitation: InvitationStatusDto
  ): Observable<InvitationStatusDto> {
    return this.http.put<InvitationStatusDto>(
      `${environment.apiUrl}/invitation/change`,
      invitation
    );
  }
}
