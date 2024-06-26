import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { Musician } from 'src/app/core/models/musician.js';

@Component({
  selector: 'app-profile-info-page',
  templateUrl: './profile-info-page.component.html',
  styleUrls: ['./profile-info-page.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    ButtonComponent,
    RouterLink,
    TranslateModule,
  ],
})
export class ProfileInfoPageComponent implements OnInit {
  musician!: Musician;
  userId!: number;

  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.profileService.getMoreInfo(this.userId).subscribe((result) => {
        this.musician = result;
      });
    });
  }
}
