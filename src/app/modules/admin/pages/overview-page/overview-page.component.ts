import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { InstrumentsPageComponent } from '../instruments-page/instruments-page.component';
import { Modules } from '../../enums/modules.enum';
import { GenresPageComponent } from '../genres-page/genres-page.component';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    InstrumentsPageComponent,
    GenresPageComponent,
  ],
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent {
  currentModule: Modules = Modules.Instruments;
  readonly Modules = Modules;

  changeModule(module: Modules): void {
    this.currentModule = module;
  }
}
