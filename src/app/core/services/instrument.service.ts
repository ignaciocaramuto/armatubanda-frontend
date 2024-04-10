import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Instrument } from 'src/app/core/models/instrument.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService extends CrudService<Instrument> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/instrument`);
  }

  getInstruments(): Observable<Instrument[]> {
    return this.getAll();
  }

  addInstrument(name: string): Observable<Instrument> {
    return this.http.post<Instrument>(`${this.apiUrl}`, { name }).pipe(
      tap(() =>
        this._logMessageService.logConfirm(
          '¡Instrumento agregado correctamente!'
        )
      ),
      catchError((res: HttpErrorResponse) =>
        throwError(() => {
          if (res.error)
            this._logMessageService.logServerError(res.error.message);
        })
      )
    );
  }
}
