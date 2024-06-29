import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PatientRoutingModule } from './patient-routing.module'
import { RegisterCiteComponent } from './page/register-cite/register-cite.component'
import { CoreModule } from 'src/app/core/core.module'

import { PendingComponent } from './page/pending/pending.component'
import { PatientMaterialModule } from './patient-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HistoryComponent } from './page/history/history.component'
import { HomeComponent } from './page/home/home.component'
import { PatientPagesComponent } from './patient-pages.component'

@NgModule({
  declarations: [RegisterCiteComponent, PendingComponent, HistoryComponent, HomeComponent, PatientPagesComponent,],
  imports: [
    CommonModule,
    PatientRoutingModule,
    CoreModule,
    PatientMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],  
})
export class PatientModule { }
