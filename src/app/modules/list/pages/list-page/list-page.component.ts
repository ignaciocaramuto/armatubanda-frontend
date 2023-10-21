import { Component } from '@angular/core';
import { Musician } from 'src/app/core/models/musician';
import { ListService } from '../../services/list.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  musicians: Musician[] = [];

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (Object.keys(params).length > 0) {
        localStorage.setItem('filter-data', JSON.stringify(params));
      }
      this.getList(params);
    });
  }

  getList(filters?: any): void {
    this.listService.getAllUsers(filters).subscribe((data: Musician[]) => {
      this.musicians = data;
    });
  }
}
