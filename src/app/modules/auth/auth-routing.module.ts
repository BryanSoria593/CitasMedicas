import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from 'src/app/core/components/notfound/notfound.component';
import { AuthLoginGuard } from 'src/app/core/guards/auth-login.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate:[AuthLoginGuard]

  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate:[AuthLoginGuard]
  },
  {
    path:'404',
    component: NotfoundComponent,
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
