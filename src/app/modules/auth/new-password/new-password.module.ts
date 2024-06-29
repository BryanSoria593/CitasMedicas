import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NewPasswordComponent } from './new-password.component'
import { RouterModule, Routes } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
  {
    path: '',
    component: NewPasswordComponent
  }
]

@NgModule({
  declarations: [ NewPasswordComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class NewPasswordModule { }