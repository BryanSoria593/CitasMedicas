import { NgModule } from '@angular/core'
import { RegisterPageComponent } from './register-page.component'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    { path: '', component: RegisterPageComponent }
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [RegisterPageComponent],
    providers: [],
})

export class RegisterModule { }