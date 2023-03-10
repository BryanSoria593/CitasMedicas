import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api;
  private helper = new JwtHelperService();


  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
  ) { }

  login(email: String, password: String): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = {
      email,
      password
    }
    return this.http.post(`${this.URL}/auth`, body, { headers })

  }
  register(data: any): Observable<any> {
    const { cedula, email, nombres, apellidos, fecha, ciudad, sexo, imagen, password, passwordConfirm } = data;

    const headers = new HttpHeaders().set('Content-type', 'application/json');
    const body = {
      cedula,
      email,
      nombres,
      apellidos,
      fecha,
      ciudad,
      sexo,
      imagen,
      password,
      passwordConfirm

    }
    return this.http.post(`${this.URL}/auth/new`, body, { headers });
  }

  renewToken(token: string): Observable<any> {

    return this.http.post<any>(`${this.URL}/auth/renew`, {
      token
    })
  }

  logout() {
    this.cookie.delete('token', '/');
    this.router.navigateByUrl('/auth/login');
  }

  isUserLoggedIn(): boolean {
    const token = this.cookie.get('token');
    if (!token) {
      return false;
    }
    const isExpired = this.helper.isTokenExpired(token);
    if (isExpired) {
      this.cookie.delete('token', '/');
      return false;
    }
    return true;
  }

  // checkToken(): boolean {

  //   const token = this.cookie.get('token');
  //   const isExpired = this.helper.isTokenExpired(token);

  //   if (isExpired ) {
  //     this.logout();
  //     this.router.navigateByUrl('/auth/login');
  //     return false;
  //   }
  //   this.store.dispatch(AuthActions.renewToken({ token }));
  //   return true;
  // }




}
