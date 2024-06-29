import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { RouterModule } from '@angular/router'
import { OrderModule } from 'ngx-order-pipe'

import { MenuComponent } from './components/menu/menu.component'
import { HeaderComponent } from './components/header/header.component'
import { NotfoundComponent } from './components/notfound/notfound.component'
import { CitesComponent } from './components/cites/cites.component'
import { ConfirmCiteComponent } from './components/mat-dialogs/confirm-cite/confirm-cite.component'
import { GenericComponent } from './components/mat-dialogs/generic/generic.component'
import { ConfirmGenericComponent } from './components/mat-dialogs/confirm-generic/confirm-generic.component'
import { EditCiteComponent } from './components/mat-dialogs/edit-cite/edit-cite.component'
import { InfoHistorialComponent } from './components/mat-dialogs/info-historial/info-historial.component'
import { MaterialModule } from './material.module'
import { DetailsCiteComponent } from './components/mat-dialogs/details-cite/details-cite.component'
import { AssignMedicationComponent } from './components/mat-dialogs/assign-medication/assign-medication.component'

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    NotfoundComponent,
    CitesComponent,
    ConfirmCiteComponent,
    GenericComponent,
    ConfirmGenericComponent,
    EditCiteComponent,
    InfoHistorialComponent,
    DetailsCiteComponent,
    AssignMedicationComponent,
  ],
  entryComponents: [ConfirmCiteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    OrderModule,
    CitesComponent,
  ],
})

export class CoreModule { }