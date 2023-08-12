import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() user!: User;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openProfile(): void {
    this.router.navigate(['/list/profile', this.user.id]);
  }

}
