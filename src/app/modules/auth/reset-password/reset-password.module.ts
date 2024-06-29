import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ResetPasswordComponent } from './reset-password.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent
  }
]

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class ResetPasswordModule { }