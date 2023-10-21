import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Musician } from 'src/app/core/models/musician';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() musician!: Musician;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openProfile(): void {
    this.router.navigate(['/profile', this.musician.id]);
  }
}
