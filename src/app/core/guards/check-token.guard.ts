import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AppState } from 'src/app/state/app.state';
import * as AuthActions from '../../state/actions/auth.action';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {
  canActivate(
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkToken();
  }

  checkToken(): boolean {
    // const helper = new JwtHelperService();
    const token = this.cookie.get('token');
    // const isExpired = helper.isTokenExpired(token);

    // if (isExpired ) {
    //   this.authService.logout();
    //   return false;
    // }
    this.store.dispatch(AuthActions.renewToken({ token }));
    return true;
  }

  constructor(
    private cookie: CookieService,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }
  
}
