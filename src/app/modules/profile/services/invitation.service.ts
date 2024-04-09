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
      `${environment.apiUrl}/invitation`,
      invitation
    );
  }

  getPendingInvitations(): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(`${environment.apiUrl}/invitation`);
  }

  changeInvitationStatus(id: number, status: boolean): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/invitation/${id}?accepted=${status}`
    );
  }
}
