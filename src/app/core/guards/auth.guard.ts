import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verifyToken();
  }

  verifyToken(){
    const helper = new JwtHelperService();
    const token = this.cookieService.get('token');
    const isExpired = helper.isTokenExpired(token);

    if(!token || isExpired){
      this.cookieService.delete('token','/')
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }

  constructor(
    private router: Router, 
    private cookieService: CookieService){}
  
}
