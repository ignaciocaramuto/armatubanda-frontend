import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { BandService } from '../../services/band.service';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AdvertisementService } from 'src/app/modules/advertisements/services/advertisement.service';
import { ApplicationService } from '../../services/application.service';
import { Application } from '../../models/application.interface';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { LogMessageService } from 'src/app/core/services/log-message.service';
import { Band } from '../../models/band.interface.js';

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
    RouterLink,
    ButtonComponent,
  ],
})
export class RequestsComponent implements OnInit {
  user = this.authService.currentUser();
  band!: Band;
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
    private dialog: MatDialog,
    private logMessageService: LogMessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bandId = params['id'];
      this.getBand(this.bandId, true);
    });

    this.profileService.getMusicianLeaderBands(123).subscribe((bands) => {
      this.leaderBands = bands.map(({ id, name }) => ({
        id,
        name,
      }));
    });

    this.formGroup.get('bandId')?.valueChanges.subscribe((bandId) => {
      if (bandId) {
        this.bandId = bandId;
        this.getBand(bandId, false);
        this.getAds(bandId);
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
          if (status) {
            this.applicationService
              .accept(this.bandId, applicationId)
              .subscribe((result) => {
                if (result) {
                  this.getApplications(applicationId);
                }
              });
          } else {
            this.applicationService
              .reject(this.bandId, applicationId)
              .subscribe((result) => {
                if (result) {
                  this.getApplications(applicationId);
                }
              });
          }
        }
      });
  }

  deleteAdvertisement(): void {
    const confirmText = '¿Estás seguro que quieres borrar este aviso?';
    this.dialog
      .open(ConfirmDialogComponent, {
        data: confirmText,
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          this.advertisementService
            .delete(this.formGroup.get('adId')?.value)
            .subscribe(() => {
              this.logMessageService.logConfirm(
                '¡Aviso borrado correctamente!'
              );
              this.getAds(this.bandId);
            });
        }
      });
  }

  private getBand(id: number, setValue: boolean): void {
    this.bandService.getById(id).subscribe((res) => {
      this.band = res;

      if (setValue) {
        this.formGroup.get('bandId')?.setValue(this.band.id);
      }
    });
  }

  private getApplications(adId: number): void {
    const ad = {
      adId,
    };

    this.applicationService.getAll(ad).subscribe((result) => {
      this.applications = result;
    });
  }

  private getAds(bandId: number): void {
    this.advertisementService.getAds(bandId).subscribe((ads) => {
      this.advertisements = ads.map((ad) => ({
        id: ad.id,
        name: ad.title,
      }));
      this.formGroup.get('adId')?.enable();
    });
  }
}
