import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandFiltersComponent } from '../../components/band-filters/band-filters.component';

@Component({
  selector: 'app-band-list',
  standalone: true,
  imports: [CommonModule, BandFiltersComponent],
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.scss'],
})
export class BandListComponent {}
