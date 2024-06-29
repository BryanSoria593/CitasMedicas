import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from 'src/app/core/guards/auth.guard'
import { EditProfileGuard } from 'src/app/core/guards/edit-profile.guard'

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./login-page/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register-page/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'edit-profile',
    canActivate: [EditProfileGuard],
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfileModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'new-password/:token',
    loadChildren: () => import('./new-password/new-password.module').then(m => m.NewPasswordModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }