import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/modules/auth/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class EditProfileGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  async canActivate(): Promise<boolean | UrlTree> {
    const isEditProfile = await this.verifyIsEditProfile()
    return isEditProfile
  }

  async verifyIsEditProfile(): Promise<boolean> {
    const isLogged = await this.authService.isLoggedIn()
    if (isLogged) return true
    this.router.navigateByUrl('/auth/login')
    return false
  }

  verifyRol(): Observable<number> {
    return this.authService.getRolUser()
  }
    
}
