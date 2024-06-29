import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/modules/auth/services/auth.service'

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  async canActivate(): Promise<boolean | UrlTree> {
    const isLogged = await this.authService.isLoggedIn()
    this.verifyRol().subscribe((idRol: number) => {
      if (idRol === 0) {
        this.router.navigateByUrl('/paciente/home')
        return false
      } else if (idRol === 1) {
        this.router.navigateByUrl('/doctor/dashboard')
        return false
      }
      return true
    })
    return !isLogged
  }
  
  verifyRol(): Observable<number> {
    return this.authService.getRolUser()
  }
  
}
