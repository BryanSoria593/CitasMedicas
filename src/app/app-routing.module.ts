import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './core/components/notfound/notfound.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLoginGuard } from './core/guards/auth-login.guard';

import { HomePageComponent } from './modules/home/page/home-page/home-page.component';
import { CheckTokenGuard } from './core/guards/check-token.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m =>m.AuthModule ),
  },  
  {
    path:'',
    component:HomePageComponent,
    canActivate: [AuthGuard, CheckTokenGuard],
    loadChildren: () => import('./modules/home/home.module').then( m =>m.HomeModule ),
    
  },
  {
    path:'cites',
    canActivate: [AuthGuard, CheckTokenGuard],
    loadChildren: () => import('./modules/cites/cites.module').then( m =>m.CitesModule ),  
    
  },
  {
    path:'404',
    component: NotfoundComponent,
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
