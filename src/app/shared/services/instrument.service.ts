import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addInstrument(instrument: Instrument): Observable<Instrument> {
    return this.create(instrument);
  }

  deleteInstrument(id: number): Observable<void> {
    return this.delete(id);
  }
}
