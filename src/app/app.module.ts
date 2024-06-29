import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { ROOT_REDUCERS } from './state/app.state'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { InjectSessionInterceptor } from './core/interceptors/inject-session.interceptor'

import { AuthEffects } from './state/effects/auth.effects'
import { CitesEffects } from './state/effects/cites.effects'
import { SpecialityEffects } from './state/effects/appointmentInfo.effects'
import { HistoryEffects } from './state/effects/history.effects'
import { GeneralService } from './shared/services/general.service'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    EffectsModule.forRoot([AuthEffects, CitesEffects, SpecialityEffects,HistoryEffects ]),
    AppRoutingModule
  ],
  providers: [
    GeneralService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectSessionInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}