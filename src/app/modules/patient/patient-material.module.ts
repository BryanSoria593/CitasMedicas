import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSelectModule} from '@angular/material/select'
import {MatTableModule} from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import {MatCardModule} from '@angular/material/card'
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatStepperModule} from '@angular/material/stepper'
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from '@angular/material/input'
import {MatRadioModule} from '@angular/material/radio'
import {MatButtonModule} from '@angular/material/button'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import {MatDialogModule} from '@angular/material/dialog'
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

@NgModule({
    exports: [
        CommonModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        MatCheckboxModule,
        MatCardModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatProgressSpinnerModule
    ]
})

export class PatientMaterialModule { }