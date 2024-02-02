import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { BandAdvertisement } from '../../band/models/bandAdvertisement.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { Advertisement } from '../models/advertisement.interface';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService extends CrudService<Advertisement> {
  // TODO: extend CRUD service: update API to return correct class in create advertisement
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/ad`);
  }

  createAdvertisement(request: FormData): Observable<BandAdvertisement> {
    return this.http
      .post<BandAdvertisement>(`${environment.apiUrl}/ad`, request)
      .pipe(
        tap(
          () =>
            this._logMessageService.logConfirm(
              '¡Aviso publicado correctamente!'
            ),
          catchError((res: HttpErrorResponse) =>
            throwError(() =>
              this._logMessageService.logServerError(
                'El aviso no pudo ser publicado. Por favor inténtelo de nuevo más tarde.'
              )
            )
          )
        )
      );
  }

  getAds(bandId: number): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${environment.apiUrl}/ad/${bandId}`);
  }
}
