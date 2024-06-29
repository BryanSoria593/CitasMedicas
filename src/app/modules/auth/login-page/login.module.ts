import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginPageComponent } from './login-page.component'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
    { path: '', component: LoginPageComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [LoginPageComponent],
})

export class LoginModule { }