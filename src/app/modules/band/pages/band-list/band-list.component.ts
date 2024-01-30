import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandFiltersComponent } from '../../components/band-filters/band-filters.component';
import { ActivatedRoute, Params } from '@angular/router';
import { BandService } from '../../services/band.service';
import { Band } from '../../models/band.interface';
import { BandCardComponent } from '../../components/band-card/band-card.component';
import { BandProfile } from '../../models/bandProfile.interface';

@Component({
  selector: 'app-band-list',
  standalone: true,
  imports: [CommonModule, BandFiltersComponent, BandCardComponent],
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.scss'],
})
export class BandListComponent implements OnInit {
  bands: BandProfile[] = [];

  constructor(
    private route: ActivatedRoute,
    private bandService: BandService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      let existingFilterData = localStorage.getItem('band-filter-data');
      if (Object.keys(params).length > 0) {
        let newData = params;
        if (existingFilterData) {
          const existingData = JSON.parse(existingFilterData);
          newData = { ...existingData, ...params };
        }
        existingFilterData = JSON.stringify(newData);
        localStorage.setItem('band-filter-data', existingFilterData);
      }
      if (existingFilterData) {
        this.getList(JSON.parse(existingFilterData));
      } else {
        this.getList();
      }
    });
  }

  getList(filters?: any): void {
    this.bandService.getAll(filters).subscribe((data: BandProfile[]) => {
      this.bands = data;
    });
  }
}
