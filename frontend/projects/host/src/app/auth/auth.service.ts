import { computed, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../shared/environments/environments';
import { UsuarioInterface } from '../../../../shared/interfaces/usuario.interface';
import { AuthStatus } from '../../../../shared/interfaces/auth/auth-status.enum';
import { authResponseInterface } from '../../../../shared/interfaces/auth/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;

  private _currentUser = signal<UsuarioInterface | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //Variables publicas seguras
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor(private http: HttpClient) {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: UsuarioInterface, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  login(dni: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/login`;
    const body = { dni, password };

    return this.http.post<authResponseInterface>(url, body).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((err) => {
        const message = err.error.message;
        return throwError(() => message);
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/api/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<authResponseInterface>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);

        return of(false);
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
