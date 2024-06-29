import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, filter, lastValueFrom } from 'rxjs'
import { environment } from 'src/environments/environment'
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { logoutRequest, persistDataUserRequest } from 'src/app/state/actions/auth.action'
import { AppState } from 'src/app/state/app.state'
import { Store } from '@ngrx/store'
import { selectIdRol } from 'src/app/state/selectors/user.selector'
import { RegisterModel } from 'src/app/core/models/user/user.interface'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private headers = new HttpHeaders().set('Content-type', 'application/json')
  private readonly URL = environment.api

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  login(email: String, password: String): Observable<any> {
    const body = {
      email,
      password
    }
    return this.http.post(`${this.URL}/auth/login`, body)
  }

  register(data: RegisterModel): Observable<any> {
    return this.http.post(`${this.URL}/auth/new`, data, { headers: this.headers })
  }
  
  async isLoggedIn(): Promise<boolean> {
    const token = this.cookie.get('token')
    if (!token) {
      this.cookie.delete('token', '/')
      return false
    }
    try {
      const result = await lastValueFrom(this.validateToken(token))
      if (!result.ok) {
        this.cookie.delete('token', '/')
        return false
      }
      this.store.dispatch(persistDataUserRequest({ token }))
      return true
    } catch (error) {
      return false
    }
  }

  validateToken(token: string): Observable<any> {
    const body = {
      token
    }
    return this.http.post<any>(`${this.URL}/auth/validateToken`, body)
  }

  renewToken(token: string): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth/renew`, { token })
  }

  getRolUser(): Observable<number> {
    return this.store.select(selectIdRol).pipe(
      filter(idRol => {
        return idRol !== null && idRol !== undefined
      }),
    )
  }

  updateProfile(nombres: string, apellidos: string, email: string, password: string): Observable<any> {
    const body = {
      nombres,
      apellidos,
      email,
      password
    }
    return this.http.patch(`${this.URL}/auth/updateProfile`, body, { headers: this.headers })
  }

  updatePasswordFromProfile(email: string, currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const body = {
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    }
    return this.http.patch(`${this.URL}/auth/updatePassword`, body, { headers: this.headers })
  }

  sendMailResetPassword(email: string): Observable<any> {
    return this.http.post(`${this.URL}/auth/resetPassword`, { email }, { headers: this.headers })
  }

  validateTokenForResetPassword(token: string): Observable<any> {
    return this.http.post(`${this.URL}/auth/validateTokenForResetPassword`, { token })
  }

  resetPassword(token: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.URL}/auth/renewPassword`, { token, newPassword, confirmPassword })
  }

  logout() {
    this.store.dispatch(logoutRequest())
  }
}
