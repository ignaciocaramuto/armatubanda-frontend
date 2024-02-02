import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { ProfileResumeComponent } from 'src/app/modules/profile/components/profile-resume/profile-resume.component';
import { BandProfile } from '../../models/bandProfile.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { BandService } from '../../services/band.service';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AdvertisementService } from 'src/app/modules/advertisements/services/advertisement.service';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.interface';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  standalone: true,
  imports: [
    ProfileImageComponent,
    MatCardModule,
    MatButtonModule,
    NgFor,
    MatDialogModule,
    NgIf,
    InputSelectComponent,
    ReactiveFormsModule,
  ],
})
export class RequestsComponent implements OnInit {
  user = this.authService.currentUser();
  band!: BandProfile;
  bandId!: number;
  leaderBands: any[] = [];
  advertisements: any[] = [];
  applications!: Application[];
  formGroup: FormGroup = this.fb.group({
    bandId: [],
    adId: [{ value: '', disabled: true }],
  });

  constructor(
    private route: ActivatedRoute,
    private bandService: BandService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private advertisementService: AdvertisementService,
    private applicationService: ApplicationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bandId = params['id'];
      this.bandService.getById(this.bandId).subscribe((res) => {
        this.band = res;
      });
    });

    this.profileService.getMusicianLeaderBands(2132131).subscribe((bands) => {
      this.leaderBands = bands.map((band) => ({
        id: band.musicianBandsDto.bandId,
        name: band.musicianBandsDto.bandName,
      }));
    });

    this.formGroup.get('bandId')?.valueChanges.subscribe((bandId) => {
      if (bandId) {
        this.advertisementService.getAll(bandId).subscribe((ads) => {
          this.advertisements = ads.map((ad) => ({
            id: ad.adId,
            name: ad.adName,
          }));
          this.formGroup.get('adId')?.enable();
        });
      }
    });

    this.formGroup.get('adId')?.valueChanges.subscribe((adId) => {
      if (adId) {
        this.getApplications(adId);
      }
    });
  }

  applicationChange(applicationId: number, status: boolean): void {
    const confirmText = status
      ? '¿Estás seguro que quieres aceptar esta solicitud?'
      : '¿Estás seguro que quieres rechazar esta solicitud?';
    this.dialog
      .open(ConfirmDialogComponent, {
        data: confirmText,
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          const data = {
            applicationId,
            status,
          };
          this.applicationService
            .changeApplicationStatus(data)
            .subscribe((result) => {
              if (result) {
                this.getApplications(applicationId);
              }
            });
        }
      });
  }

  private getApplications(adId: number): void {
    this.applicationService.getAll(adId).subscribe((result) => {
      this.applications = result;
    });
  }
}
