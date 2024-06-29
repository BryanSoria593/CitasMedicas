import { NgModule } from '@angular/core'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatRadioModule } from '@angular/material/radio'
import { MatNativeDateModule } from '@angular/material/core'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
  exports: [
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ]
})

export class MaterialModule { }