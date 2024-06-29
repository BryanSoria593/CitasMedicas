import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/state/app.state'
import { loginRequest } from 'src/app/state/actions/auth.action'
import { LoginModel } from 'src/app/core/models/user/user.interface'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({})
  isMobile: boolean = false

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.newFormGroup() 
  }

  sendLogin(): void {
    const credentials: LoginModel = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }
    this.store.dispatch(loginRequest({ credentials }))
  }

  newFormGroup(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('', [
          Validators.required,
        ]),
      }
    )
  }
}
