import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PendingComponent } from './page/pending/pending.component'
import { RegisterCiteComponent } from './page/register-cite/register-cite.component'
import { HistoryComponent } from './page/history/history.component'
import { HomeComponent } from './page/home/home.component'
import { PatientPagesComponent } from './patient-pages.component'

const routes: Routes = [
  {
    path: '',
    component: PatientPagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'agendar', component: RegisterCiteComponent },
      { path: 'pendientes', component: PendingComponent },
      { path: 'historial', component: HistoryComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }