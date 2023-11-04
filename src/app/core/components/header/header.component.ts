import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  authService = inject(AuthService);
  user = this.authService.currentUser();
  status = this.authService.authStatus();

  ngOnInit(): void {
    this.authService.checkAuthentication().subscribe();
  }
}
