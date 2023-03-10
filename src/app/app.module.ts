import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InjectSessionInterceptor } from './core/interceptors/inject-session.interceptor';
import { HomePageComponent } from './modules/home/page/home-page/home-page.component';

import { EffectsModule } from '@ngrx/effects';
import { GeneralService } from './shared/services/general.service';
import { ROOT_REDUCERS } from './state/app.state';
import { AuthEffects } from './state/effects/auth.effects';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CoreModule } from './core/core.module';
import { CitesEffects } from './state/effects/cites.effects';
import { RouterModule } from '@angular/router';

RouterModule
@NgModule({
  declarations: [AppComponent, HomePageComponent,   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot( ROOT_REDUCERS ),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    EffectsModule.forRoot([AuthEffects,CitesEffects]),
    MatSnackBarModule,
    CoreModule,
    RouterModule
    
  ],
  providers: [
    CookieService,
    GeneralService,   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectSessionInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
