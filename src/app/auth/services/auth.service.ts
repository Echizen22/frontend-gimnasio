import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { RegisterUser } from '../interfaces/register-user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  //! Al mundo exterior
  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() {
    // this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean {

    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);

    return true;
  }


  login( dni: string, password: string ): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/login`;
    const body = { dni, password };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ user, token }) => this.setAuthentication(user, token)),
        catchError( err => throwError( () => {
          if( Array.isArray(err.error.message)) {
            return err.error.message[0];
          }
          return err.error.message;
        })
      )
    )

  }


  checkAuthStatus(): Observable<boolean> {

    const url = `${ this.baseUrl }/auth/check-token`;
    const token = localStorage.getItem('token');

    if ( !token ) {
      this.logout();
      return of(false);
    }
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);


    return this.http.get<CheckTokenResponse>(url, { headers } )
      .pipe(
        map( ({ user, token }) => this.setAuthentication(user, token)),
        catchError( () => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false);
        })
      )

  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set( null );
    // this._authStatus.set( AuthStatus.notAuthenticated );
    this._authStatus.set( AuthStatus.notAuthenticated );
  }


  register( body: RegisterUser) {

    const url = `${ this.baseUrl }/auth/register`;

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map( () => {
          return true
        }),
        catchError( err => throwError( () => {
          if( Array.isArray(err.error.message)) {
            return err.error.message[0];
          }
          return err.error.message;
        }))
      )


  }
}
