import { Component } from '@angular/core';
import { Musician } from 'src/app/core/models/musician';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent {

  musicians: Musician[] = [];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.listService.getAllUsers().subscribe((data: Musician[]) => {
      this.musicians = data;
    });
  }

}
