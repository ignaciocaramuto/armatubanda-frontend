import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Band } from '../../models/band.interface';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-band-card',
  standalone: true,
  imports: [CommonModule, ProfileImageComponent],
  templateUrl: './band-card.component.html',
  styleUrls: ['./band-card.component.scss'],
})
export class BandCardComponent {
  @Input() band!: Band;

  constructor(private router: Router) {}

  openProfile(): void {
    this.router.navigate(['/band/profile', this.band.id]);
  }
}
