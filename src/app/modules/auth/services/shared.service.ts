import { Injectable } from '@angular/core'
import { AbstractControl, ValidatorFn } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  checkPasswords: ValidatorFn = (control: AbstractControl) => {
    const pass = control.get('newPassword')?.value
    const confirmPass = control.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  checkPatternPassword: ValidatorFn = (control: AbstractControl) => {
    const pass = control.get('newPassword')?.value
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{8,}$/
    return pattern.test(pass) ? null : { notPattern: true }
  }
}