import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from 'src/app/modules/list/components/filters/filters.component';
import { MatCardModule } from '@angular/material/card';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-advertisements-page',
  standalone: true,
  imports: [
    CommonModule,
    FiltersComponent,
    ProfileImageComponent,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './advertisements-page.component.html',
  styleUrls: ['./advertisements-page.component.scss'],
})
export class AdvertisementsPageComponent {}
