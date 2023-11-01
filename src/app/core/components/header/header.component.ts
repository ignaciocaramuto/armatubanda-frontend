import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SanitizeImagePipe } from '../../pipes/sanitize-image.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    SanitizeImagePipe,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  public user = this.authService.currentUser();

  public status = this.authService.authStatus();

  constructor(public route: Router) {}

  ngOnInit(): void {
    this.authService.checkAuthentication().subscribe({
      next: (response) => {
        if (!response) {
          localStorage.clear();
        }
      },
      error: (error) => {
        console.log('error ', error);
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
