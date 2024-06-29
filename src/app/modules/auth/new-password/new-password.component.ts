import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { UserDataResetPassword } from 'src/app/core/models/user/user.interface'
import { GeneralService } from 'src/app/shared/services/general.service'
import { SharedService } from '../services/shared.service'

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
})

export class NewPasswordComponent implements OnInit {
  formResetPassword: FormGroup = new FormGroup({})
  userData: UserDataResetPassword = {} as UserDataResetPassword

  constructor(
    private routeA: ActivatedRoute,
    private route: Router,
    private authService: AuthService,
    private generalService: GeneralService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.newFormGroup()
    this.validateToken()
  }

  newFormGroup(): void {
    this.formResetPassword = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [ Validators.required ]),
    },
      { validators: [
        this.sharedService.checkPasswords,
        this.sharedService.checkPatternPassword
      ] }
    )
  }

  

  validateToken(): void {
    const token = this.routeA.snapshot.paramMap.get('token')
    this.authService.validateTokenForResetPassword(token).subscribe({
      next: res => {
        this.userData = res.data
      },
      error: err => {
        if (err.error.status !== 200) {
          this.route.navigate(['/404'])
        }
      }
    })
  }

  sendResetPassword() {
    const dialog = this.generalService.openDialogLoading()
    const newPassword = this.formResetPassword.value.newPassword
    const confirmPassword = this.formResetPassword.value.confirmPassword
    const token = this.routeA.snapshot.paramMap.get('token') || ''
    this.authService.resetPassword(token, newPassword, confirmPassword).subscribe({
      next: res => {
        dialog.close()
        this.generalService.openSnackBar(res.msg, 'success', 5000)
        this.route.navigate(['/auth/login'])
      },
      error: err => {
        dialog.close()
        this.generalService.openSnackBar(err.error.msg, 'error', 5000)
      }
    })
  }
}