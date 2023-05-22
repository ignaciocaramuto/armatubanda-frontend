import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  name!: string;
  
  userType!: any[];
  selectedUser: any;

  instruments!: any[];

  genres!: any[];

  multipleOptions!: any[];
  selectedMultipleOptions!: any[];

  experience: any[];
  selectedExperience!: string;

  ratingValues: number[] = [1,5];

  constructor() {
    this.experience = [
      {
        id: 1,
        año: 'Menos de 1 año'
      },
      {
        id: 2,
        año: 'Entre 1 y 3 años'
      },
      {
        id: 3,
        año: 'Entre 3 y 5 años'
      },
      {
        id: 4,
        año: 'Más de 5 años'
      }
    ]
  }

  ngOnInit(): void {
  }

  changeMultiSelectOptions(): void {
    if (this.selectedUser.id === 1) {
      this.multipleOptions = this.instruments;
    } else if (this.selectedUser.id === 2) {
      this.multipleOptions = this.genres;
    }
  }

  clearFilters(): void {
    this.name = '';
    this.selectedExperience = '';
    this.selectedMultipleOptions = [];
    this.selectedUser = null;
    this.ratingValues = [1,5];
  }

}
