import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirmation-email-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf],
  templateUrl: './confirmation-email-page.component.html',
  styleUrls: ['./confirmation-email-page.component.scss'],
})
export class ConfirmationEmailPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const token = params['token'];
      if (token) {
        this.authService.confirmEmail(token).subscribe((result) => {
          if (result) {
            setTimeout(() => {
              this.router.navigateByUrl('/musician/create');
            }, 3000);
          }
        });
      }
    });
  }
}
