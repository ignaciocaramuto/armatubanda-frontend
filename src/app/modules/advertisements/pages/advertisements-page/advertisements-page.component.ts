import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from 'src/app/modules/list/components/filters/filters.component';
import { MatCardModule } from '@angular/material/card';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { MatButtonModule } from '@angular/material/button';
import { AdvertisementService } from '../../services/advertisement.service';
import { Advertisement } from '../../models/advertisement.interface';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddApplicationDialogComponent } from '../../components/add-application-dialog/add-application-dialog.component';
import { AdvertisementStatus } from '../../enums/advertisementStatus.enum';

@Component({
  selector: 'app-advertisements-page',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    ProfileImageComponent,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './advertisements-page.component.html',
  styleUrls: ['./advertisements-page.component.scss'],
})
export class AdvertisementsPageComponent implements OnInit {
  advertisements: Advertisement[] = [];
  user = this.authService.currentUser();
  readonly advertisementStatus = AdvertisementStatus;

  constructor(
    private advertisementService: AdvertisementService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(filters?: any): void {
    this.advertisementService
      .getAll(filters)
      .subscribe((data: Advertisement[]) => {
        this.advertisements = data;
      });
  }

  getButtonLabel(status: AdvertisementStatus): string {
    switch (status) {
      case this.advertisementStatus.ELIGIGLE:
        return 'Enviar solicitud';
      case this.advertisementStatus.PENDING_INVITATION:
        return 'Invitación pendiente';
      case this.advertisementStatus.MEMBER:
        return 'Ya eres miembro';
      case this.advertisementStatus.PENDING_APPLICATION:
        return 'Solicitud pendiente';
      default:
        return '';
    }
  }

  openApplicationDialog(adId: number): void {
    const dialogRef = this.dialog.open(AddApplicationDialogComponent, {
      width: '600px',
      height: '300px',
      disableClose: true,
      data: adId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getList();
      }
    });
  }
}
