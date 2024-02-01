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
import { MusicianBands } from 'src/app/core/models/musicianBands.interface';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddApplicationDialogComponent } from '../../components/add-application-dialog/add-application-dialog.component';

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
  musicianBands: MusicianBands[] = [];
  user = this.authService.currentUser();

  constructor(
    private advertisementService: AdvertisementService,
    private profileService: ProfileService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getList();
    this.profileService
      .getMusicianBands(this.user()!.id)
      .subscribe((data) => (this.musicianBands = data));
  }

  getList(filters?: any): void {
    this.advertisementService
      .getAll(filters)
      .subscribe((data: Advertisement[]) => {
        this.advertisements = data;
      });
  }

  isMember(id: number): boolean {
    return !this.musicianBands.some(({ bandId }) => bandId === id);
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
        // TODO: Pending request
      }
    });
  }
}
