import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Musician } from 'src/app/core/models/musician';
import { ProfileImageComponent } from '../../../../core/components/profile-image/profile-image.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, ProfileImageComponent],
})
export class CardComponent {
  @Input() musician!: Musician;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openProfile(): void {
    this.router.navigate(['/profile', this.musician.id]);
  }
}
