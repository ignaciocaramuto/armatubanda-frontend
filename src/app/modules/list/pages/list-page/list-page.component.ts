import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent {

  users: User[] = [];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.listService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

}
