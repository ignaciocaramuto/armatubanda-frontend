import { Component } from '@angular/core';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent {

  users: any[] = [];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.listService.getAllUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

}
