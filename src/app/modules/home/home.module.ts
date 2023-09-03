import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ButtonComponent } from 'src/app/core/components/button/button.component';

import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonComponent,
    MatSelectModule,
    SharedModule,
    InputSelectComponent,
  ],
})
export class HomeModule {}
