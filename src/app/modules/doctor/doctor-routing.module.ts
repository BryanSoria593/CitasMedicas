import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DoctorPagesComponent } from './doctor-pages.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { AppointmentsAttendedComponent } from './pages/appointments-attended/appointments-attended.component'

const routes: Routes = [
    {
        path: '',
        component: DoctorPagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'atendidos', component: AppointmentsAttendedComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DoctorRoutingModule { }