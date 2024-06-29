import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { GeneralService } from 'src/app/shared/services/general.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {

  formResetPassword: FormGroup = new FormGroup({})

  mailResponse: boolean = false
  mailMessage: string = ''

  constructor(
    private authService: AuthService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.newFormGroup()
  }

  newFormGroup(): void {
    this.formResetPassword = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,]),
    })
  }

  resetPassword() {
    const dialog = this.generalService.openDialogLoading()
    this.authService.sendMailResetPassword(this.formResetPassword.value.email).subscribe({
      next: (data) => {
        dialog.close()
        this.mailResponse = true
        this.mailMessage = data.msg
        this.generalService.openSnackBar(data.msg, 'Cerrar', 5000)
      },
      error: (error) => {
        dialog.close()
        this.mailResponse = false
        this.mailMessage = error.error.msg
        this.generalService.openSnackBar(error.error.msg, 'Cerrar', 5000)
      }
    })
  }
}