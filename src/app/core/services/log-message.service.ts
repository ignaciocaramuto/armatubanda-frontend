import { Injectable, inject } from '@angular/core';
import { snackbarConfig } from 'src/app/config/snackbar-config';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LogMessageService {
  private _snackBar = inject(MatSnackBar);

  logConfirm(message: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      ...snackbarConfig,
      data: { message },
      panelClass: ['success-snackbar'],
    });
  }

  logServerError(message: string): void {
    if (!message) {
      message =
        'El servidor no se encuentra disponible. Por favor contacte con el administrador.';
    }

    this._snackBar.openFromComponent(SnackbarComponent, {
      ...snackbarConfig,
      data: { message },
      panelClass: ['info-snackbar'],
    });
  }
}
