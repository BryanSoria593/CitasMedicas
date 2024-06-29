import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NotfoundComponent } from './core/components/notfound/notfound.component'
import { DoctorGuard } from './core/guards/doctor.guard'
import { PatientGuard } from './core/guards/patient.guard'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'paciente',
    canActivate: [PatientGuard],
    loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule),
  },
  {
    path: 'doctor',
    canActivate: [DoctorGuard],
    loadChildren: () => import('./modules/doctor/doctor.module').then(m => m.DoctorModule),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: NotfoundComponent,
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }