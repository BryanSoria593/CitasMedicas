import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CoreModule } from 'src/app/core/core.module'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DoctorRoutingModule } from './doctor-routing.module'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { DoctorPagesComponent } from './doctor-pages.component'
import { CalendarModule } from 'src/app/shared/components/calendar/calendar.module'
import { AppointmentsAttendedComponent } from './pages/appointments-attended/appointments-attended.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@NgModule({
  declarations: [DashboardComponent, DoctorPagesComponent, AppointmentsAttendedComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    MatProgressSpinnerModule
  ],
})

export class DoctorModule {}