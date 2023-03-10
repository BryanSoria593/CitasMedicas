import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitesComponent } from 'src/app/core/components/cites/cites.component';
import { AppointmentsComponent } from './page/appointments/appointments.component';
import { RegisterCiteComponents } from './page/register-cite/register-cite.component';


const routes: Routes = [
  {
    path: 'new',
    component: RegisterCiteComponents,   
  },
  {
    path: 'appointments',
    component: AppointmentsComponent
  },
  {
    path: '',
    component: CitesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitesRoutingModule { }
