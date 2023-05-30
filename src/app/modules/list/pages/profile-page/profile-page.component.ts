import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userID!: number;
  user!: User;

  constructor(private route: ActivatedRoute, private listService: ListService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.userID = params['id']);
    this.listService.getUser(this.userID).subscribe(data => {
      this.user = data;
    });
  }
}
