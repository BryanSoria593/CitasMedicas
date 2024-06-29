import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { RegisterModel } from 'src/app/core/models/user/user.interface'
import { AuthService } from '../services/auth.service'

import { GeneralService } from 'src/app/shared/services/general.service'
import { Router } from '@angular/router'
import { SharedService } from '../services/shared.service'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnInit {

  formRegister: FormGroup = null

  constructor(
    private authService: AuthService,
    private generalService: GeneralService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.newFormGroup()
  }

  async sendRegister() {
    const dialog = this.generalService.openDialogLoading()
    const credentials: RegisterModel = {
      cedula: this.formRegister.value.dni,
      email: this.formRegister.value.email,
      nombres: this.formRegister.value.names,
      apellidos: this.formRegister.value.lastName,
      fecha: this.formRegister.value.date,
      ciudad: this.formRegister.value.city,
      sexo: this.formRegister.value.sex,
      newPassword: this.formRegister.value.newPassword,
      confirmPassword: this.formRegister.value.confirmPassword,
    }

    this.authService.register(credentials).subscribe({
      next: () => {
        dialog.close()
        this.router.navigateByUrl('/auth/login')
        this.generalService.openSnackBar('Usuario registrado correctamente, Inicie sesión', 'success')
      },
      error: () => {
        dialog.close()
        this.generalService.openSnackBar('Error al registrar usuario', 'error')
      }
    })
  }

  newFormGroup() {
    this.formRegister = new FormGroup(
      {
        names: new FormControl('', [Validators.required,]),
        lastName: new FormControl('', [Validators.required,]),
        dni: new FormControl('', [Validators.required,]),
        date: new FormControl('', [Validators.required,]),
        sex: new FormControl('', [Validators.required,]),
        city: new FormControl('', [Validators.required,]),
        email: new FormControl('', [Validators.required, Validators.email,]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required,]),
      },{
        validators: [
          this.sharedService.checkPasswords,
          this.sharedService.checkPatternPassword
        ]
      }
    )
  }  
}