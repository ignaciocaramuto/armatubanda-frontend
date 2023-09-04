import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);

  public user = this.authService.currentUser();

  public status = this.authService.authStatus();

  constructor(public route: Router) {}

  ngOnInit(): void {
    this.authService.checkAuthentication().subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
