import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  standalone: true,
  imports: [ProfileImageComponent, MatCardModule, MatButtonModule, NgFor],
})
export class RequestsComponent {}
