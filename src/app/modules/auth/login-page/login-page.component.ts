import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as AuthActions from 'src/app/state/actions/auth.action';
import { LoginModel } from 'src/app/core/models/user/user.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});

  constructor(
    private store: Store<AppState>,

  ) { }

  ngOnInit(): void {
    this.newFormGroup();
    
  }

  sendLogin(): void {
    const credentials: LoginModel = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }
    this.store.dispatch(AuthActions.loginRequest({ credentials }));
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
