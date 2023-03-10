import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verifyLogin();
  }

  verifyLogin(){
    const isUserLoggedIn = this.authService.isUserLoggedIn();

    if (isUserLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    
    return true;
  }
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  
}
