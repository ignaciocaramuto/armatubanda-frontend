import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [CommonModule, AuthRoutingModule, MatSelectModule, SharedModule],
})
export class AuthModule {}
