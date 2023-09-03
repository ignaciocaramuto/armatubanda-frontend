import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { CardComponent } from './components/card/card.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ButtonComponent } from 'src/app/core/components/button/button.component';

@NgModule({
  declarations: [
    ListPageComponent,
    CardComponent,
    FiltersComponent,
    ProfilePageComponent,
  ],
  imports: [CommonModule, ListRoutingModule, ButtonComponent],
})
export class ListModule {}
