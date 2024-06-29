import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/modules/auth/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  async canActivate(): Promise<boolean | UrlTree> {
    const isPatient = await this.verifyIsPatient()
    return isPatient
  }

  async verifyIsPatient(): Promise<boolean> {
    const isLogged = await this.authService.isLoggedIn()
    if (!isLogged) {
        this.router.navigateByUrl('/auth/login')
        return false
    }
    return new Promise<boolean>((resolve, reject) => {
      this.verifyRol().subscribe((idRol: number) => {
        if (idRol === 0) {
          resolve(true)
        }
        else {
          this.router.navigateByUrl('/404')
          resolve(false)
        }
      })
    })
  }

  verifyRol(): Observable<number> {
    return this.authService.getRolUser()
  }
  
}
