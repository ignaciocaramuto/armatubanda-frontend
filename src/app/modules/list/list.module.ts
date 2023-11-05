import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { CardComponent } from './components/card/card.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { InputTextComponent } from 'src/app/core/components/input-text/input-text.component';
import { InputSelectComponent } from 'src/app/core/components/input-select/input-select.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ProfileImageComponent } from 'src/app/core/components/profile-image/profile-image.component';

@NgModule({
  declarations: [ListPageComponent, CardComponent, FiltersComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModule,
    ButtonComponent,
    InputTextComponent,
    InputSelectComponent,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    ProfileImageComponent,
  ],
})
export class ListModule {}
