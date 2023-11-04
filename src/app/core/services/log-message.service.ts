import { Injectable, inject } from '@angular/core';
import { snackbarConfig } from 'src/app/config/snackbar-config';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LogMessageService {
  private _snackBar = inject(MatSnackBar);

  logServerError(message: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      ...snackbarConfig,
      data: {
        message,
      },
      panelClass: ['info-snackbar'],
    });
  }
}
