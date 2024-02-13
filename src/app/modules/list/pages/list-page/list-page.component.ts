import { Component } from '@angular/core';
import { Musician } from 'src/app/core/models/musician';
import { ListService } from '../../services/list.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';
import { NgIf, NgFor } from '@angular/common';
import { FiltersComponent } from '../../components/filters/filters.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  standalone: true,
  imports: [FiltersComponent, NgIf, NgFor, CardComponent],
})
export class ListPageComponent {
  musicians: Musician[] = [];

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      let existingFilterData = localStorage.getItem('filter-data');
      if (Object.keys(params).length > 0) {
        let newData = params;
        if (existingFilterData) {
          const existingData = JSON.parse(existingFilterData);
          newData = { ...existingData, ...params };
        }
        existingFilterData = JSON.stringify(newData);
        localStorage.setItem('filter-data', existingFilterData);
      }
      if (existingFilterData) {
        this.getList(JSON.parse(existingFilterData));
      } else {
        this.getList();
      }
    });
  }

  getList(filters?: any): void {
    console.log(filters);

    this.listService.getAllUsers(filters).subscribe((data: Musician[]) => {
      this.musicians = data;
    });
  }
}
