import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { InstrumentService } from 'src/app/core/services/instrument.service';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-instruments-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './instruments-page.component.html',
  styleUrls: ['./instruments-page.component.scss'],
})
export class InstrumentsPageComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  instruments: Instrument[] = [];

  constructor(private instrumentService: InstrumentService) {}

  ngOnInit(): void {
    this.instrumentService
      .getAll()
      .subscribe((result) => (this.instruments = result));
  }
}
