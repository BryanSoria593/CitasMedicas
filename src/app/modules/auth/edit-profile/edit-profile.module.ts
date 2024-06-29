import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { EditProfileComponent } from './edit-profile.component'
import { CoreModule } from 'src/app/core/core.module'

const routes: Routes = [
    { path: '', component: EditProfileComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        CommonModule,
        CoreModule,
    ],
    declarations: [EditProfileComponent],
})

export class EditProfileModule { }