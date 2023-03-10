import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, map, exhaustMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import * as AuthActions from 'src/app/state/actions/auth.action';


@Injectable()
export class AuthEffects {
    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.loginRequest),
        exhaustMap((action) =>
            this.authService.login(action.credentials.email, action.credentials.password)
                .pipe(
                    tap(() => this.route.navigateByUrl('/')),
                    map(
                        (resp) => {                            
                            const { token } = resp.user;
                            const now = new Date();
                            const exp = new Date(now.getTime() + 3600 * 2000);
                            
                            this.cookie.set('token', token, exp, '/');
                            return AuthActions.loginSuccess({
                                user:{
                                    loading: false,
                                    user: resp.user,
                                    menuOptions: resp.menuOptions,
                                }
                            })
                        }
                    ),
                    catchError(
                        (error) => {                            
                            this.generalService.openSnackBar(error.error.msg, 'Cerrar');
                            this.route.navigateByUrl('/auth/login');
                            return [AuthActions.loginError({ error: error.error.msg })]
                        }
                    )
                )
        ))
    )

    // renewToken$ = createEffect(() => this.actions$.pipe(
    //     ofType(AuthActions.renewToken),
    //     exhaustMap((action) =>
    //         this.authService.renewToken(action.token)
    //             .pipe(
    //                 map((resp) => {
    //                     const { token } = resp.user;
    //                     const now = new Date();
    //                     const exp = new Date(now.getTime() + 3600*2000);
    //                     this.cookie.set('token', token, exp, '/');
    //                     return AuthActions.renewTokenSuccess({
    //                         user:{
    //                             loading: false,
    //                             user: resp.user,
    //                             menuOptions: resp.menuOptions,
    //                         }
    //                     })
    //                 }),
    //                 catchError((error) => {
    //                     this.cookie.delete('token', '/');
    //                     this.route.navigateByUrl('/auth/login');
    //                     this.generalService.openSnackBar(error.error.msg, 'Cerrar');
    //                     return [AuthActions.loginError({ error: error.error.msg })]
    //                 })
    //             )
    //     )
    // ));
    

    renewToken$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.renewToken),
        exhaustMap((action) =>
            this.authService.renewToken(action.token)
                .pipe(
                    map((resp) => {                        
                        
                        const { token } = resp.user;
                        const now = new Date();
                        const exp = new Date(now.getTime() + 3600*2000);
                        this.cookie.set('token', token, exp, '/');                                         
                        return AuthActions.loginSuccess({                            
                            user:{
                                loading: false,
                                user: resp.user,                                
                                menuOptions: resp.menuOptions,
                            } 
                        })
                    },
                    ),
                    catchError(
                        (error) => {
                            this.cookie.delete('token', '/');
                            this.route.navigateByUrl('/auth/login');
                            this.generalService.openSnackBar(error.error.msg, 'Cerrar');
                            
                            return [AuthActions.loginError({ error: error.error.msg })]
                        }
                    )
                ),
        )
    ));
 
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private route: Router,
        private generalService: GeneralService,
        private cookie: CookieService

    ) { }
}
