import { LoginResponse } from './../interfaces/login-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { AuthUser, AuthStatus } from 'src/app/modules/auth/interfaces/index';
import {
  Observable,
  Subject,
  catchError,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { LogMessageService } from 'src/app/core/services/log-message.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);
  private _currentUser = signal<AuthUser | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  private _logMessageService = inject(LogMessageService);

  // devuelve una señal de solo lectura
  public currentUser = computed(() => this._currentUser);
  public authStatus = computed(() => this._authStatus);
  public $user = new Subject<void>();

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/authenticate`;
    const body = { email: email, password: password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap((user: LoginResponse) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', user.token);
        localStorage.setItem('isProfileSet', JSON.stringify(user.profileSet));
        this.$user.next();
      }),
      map(() => true),

      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      )
    );
  }

  register(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { email: email, password: password };

    return this.http.post<LoginResponse>(url, body).pipe(
      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      ),
      map(() => true)
    );
  }

  logout(): void {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
    localStorage.removeItem('isProfileSet');
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const url = `${this.baseUrl}/auth/me`;

    return this.http.get<AuthUser>(url).pipe(
      tap((user) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('isProfileSet', JSON.stringify(user.profileSet));
        this.$user.next();
      }),
      map((user) => !!user),
      catchError((res: HttpErrorResponse) =>
        throwError(() => {
          localStorage.removeItem('token');
          if (res.error.message)
            this._logMessageService.logServerError(res.error?.message);
        })
      )
    );
  }

  checkProfileSet(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const url = `${this.baseUrl}/auth/me`;

    return this.http.get<AuthUser>(url).pipe(
      map(({ profileSet }) => profileSet),
      catchError((res: HttpErrorResponse) =>
        throwError(() =>
          this._logMessageService.logServerError(res.error.message)
        )
      )
    );
  }
}
