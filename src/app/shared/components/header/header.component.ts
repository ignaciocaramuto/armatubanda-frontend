import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStatus } from 'src/app/modules/auth/interfaces';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  private authService = inject(AuthService);

  constructor(public route: Router) { }

  logout(){
    this.authService.logout();
  }

  isAuthenticated():Observable<boolean>{
    return this.authService.checkAuthentication();

  }

}
