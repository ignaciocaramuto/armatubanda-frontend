import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { InstrumentService } from 'src/app/core/services/instrument.service';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddInstrumentDialogComponent } from '../../components/add-instrument-dialog/add-instrument-dialog.component';
import { ConfirmDialogComponent } from 'src/app/core/components/confirm-dialog/confirm-dialog.component';
import { LogMessageService } from 'src/app/core/services/log-message.service';

@Component({
  selector: 'app-instruments-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './instruments-page.component.html',
  styleUrls: ['./instruments-page.component.scss'],
})
export class InstrumentsPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  instruments: Instrument[] = [];

  constructor(
    private instrumentService: InstrumentService,
    private dialog: MatDialog,
    private logMessageService: LogMessageService
  ) {}

  ngOnInit(): void {
    this.getInstruments();
  }

  addInstrument(): void {
    const dialogRef = this.dialog.open(AddInstrumentDialogComponent, {
      width: '400px',
      height: '250px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((instrument) => {
      if (instrument) {
        this.instrumentService.addInstrument(instrument).subscribe((result) => {
          if (result) {
            this.getInstruments();
          }
        });
      }
    });
  }

  updateInstrument(name: string): void {
    const dialogRef = this.dialog.open(AddInstrumentDialogComponent, {
      width: '400px',
      height: '250px',
      disableClose: true,
      data: name,
    });

    dialogRef.afterClosed().subscribe((instrument) => {
      if (instrument) {
        const updatedInstrument = {
          newName: instrument,
        };
        this.instrumentService
          .update(name, updatedInstrument)
          .subscribe((result) => {
            if (result) {
              this.logMessageService.logConfirm(
                'Instrumento editado correctamente'
              );
              this.getInstruments();
            }
          });
      }
    });
  }

  deleteInstrument(name: string): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: '¿Estás seguro que quieres eliminar este instrumento?',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.instrumentService.delete(name).subscribe((res) => {
            this.logMessageService.logConfirm(res.message);
            this.getInstruments();
          });
        }
      });
  }

  private getInstruments(): void {
    this.instrumentService
      .getAll()
      .subscribe((result) => (this.instruments = result));
  }
}
