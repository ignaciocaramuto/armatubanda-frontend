import { LoginResponse } from './../interfaces/login-response';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.local';
import { AuthUser, AuthStatus } from 'src/app/modules/auth/interfaces/index';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl: string = environment.apiUrl;

  private http = inject(HttpClient);

  private _currentUser = signal<AuthUser | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  // devuelve una señal de solo lectura
  public currentUser = computed(() => this._currentUser);
  public authStatus = computed(() => this._authStatus);

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/authenticate`;
    const body = { email: email, password: password };

    return this.http.post<LoginResponse>(url, body).pipe(
      tap(
        ({ token, email, isProfileSet, firstName, lastName, profileImage }) => {
          const newAuthUser: AuthUser = {
            email,
            isProfileSet,
            firstName,
            lastName,
            profileImage,
          };
          this._currentUser.set(newAuthUser);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
          localStorage.setItem('isProfileSet', isProfileSet);
        }
      ),
      map(() => true),

      catchError((err) => {
        return throwError(() => 'Something went wrong');
      })
    );
  }

  register(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = { email: email, password: password };

    return this.http.post<LoginResponse>(url, body).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
      map(() => true)
    );
  }

  logout() {
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const url = `${this.baseUrl}/auth/me`;

    return this.http.get<AuthUser>(url).pipe(
      tap((user) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('isProfileSet', user.isProfileSet);
      }),
      map((user) => !!user),
      catchError((err) => of(false))
    );
  }

  checkProfileSet(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const url = `${this.baseUrl}/auth/me`;

    return this.http.get<AuthUser>(url).pipe(
      tap((user) => {
        localStorage.setItem('isProfileSet', user.isProfileSet);
      }),
      map((user) => {
        if (user.isProfileSet == 'false') {
          return false;
        } else {
          return true;
        }
      }),
      catchError((err) => of(false))
    );
  }
}
