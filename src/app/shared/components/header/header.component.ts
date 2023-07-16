import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStatus } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  private authService = inject(AuthService);

  public user = this.authService.currentUser();

  public status = this.authService.authStatus();

  constructor(public route: Router) {
   }

  ngOnInit(): void {
    this.authService.checkAuthentication().subscribe();
  }

  logout(){
    this.authService.logout();
  }

}
