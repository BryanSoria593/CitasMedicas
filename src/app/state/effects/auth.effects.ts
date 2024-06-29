import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { CookieService } from 'ngx-cookie-service'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import { GeneralService } from 'src/app/shared/services/general.service'
import {
    loginError,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    persistDataUserRequest,
    updatePasswordFromProfileRequest,
    updateProfileRequest
} from 'src/app/state/actions/auth.action'

@Injectable()
export class AuthEffects {
    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(loginRequest),
        switchMap((action) => {
            const dialog = this.generalService.openDialogLoading()
            return this.authService.login(action.credentials.email, action.credentials.password)
            .pipe(
                map(
                    (resp) => {
                        dialog.close()
                        const { token } = resp.user
                        const now = new Date()
                        const exp = new Date(now.getTime() + (24 * 60 * 60 * 1000))

                        this.cookie.set('token', token, exp, '/')

                        return loginSuccess({
                            user: {
                                loading: false,
                                user: resp.user,
                                menuOptions: resp.menuOptions,
                            }
                        })
                    }
                ),
                tap((authAction) => {
                    if (authAction.user.user.user_rol === 0) {
                        this.route.navigateByUrl('/paciente/home')
                    }
                    else if (authAction.user.user.user_rol === 1) {
                        this.route.navigateByUrl('/doctor/dashboard')
                    }
                    else {
                        this.route.navigateByUrl('/404')
                    }
                }),
                catchError(
                    (error) => {
                        dialog.close()
                        this.generalService.openSnackBar(error.error.msg, 'Cerrar')
                        this.route.navigateByUrl('/auth/login')
                        return [loginError({ error: error.error.msg })]
                    }
                )
            )
        }
        ))
    )

    persistDataUser$ = createEffect(() => this.actions$.pipe(
        ofType(persistDataUserRequest),
        switchMap((action) =>
            this.authService.renewToken(action.token)
                .pipe(
                    map(
                        (resp) => {
                            const { token } = resp.user
                            const now = new Date()
                            const exp = new Date(now.getTime() + (24 * 60 * 60 * 1000))

                            this.cookie.set('token', token, exp, '/')
                            return loginSuccess({
                                user: {
                                    loading: false,
                                    user: resp.user,
                                    menuOptions: resp.menuOptions,
                                }
                            })
                        }
                    ),
                    catchError(
                        (error) => {
                            this.generalService.openSnackBar(error.error.msg, 'Cerrar')
                            this.route.navigateByUrl('/auth/login')
                            return [loginError({ error: error.error.msg })]
                        }
                    )
                )
        ))
    )

    updateInfoUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProfileRequest),
            switchMap(({ credentials }) => {
                const dialog = this.generalService.openDialogLoading()
                return this.authService.updateProfile(
                    credentials.nombres,
                    credentials.apellidos,
                    credentials.email,
                    credentials.password,
                ).pipe(
                    map((resp) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(resp.msg, 'fa-solid fa-check', 'text-green-500', 3000)
                        return logoutRequest()
                    }),
                    catchError((err) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(err.error.msg, 'fa-solid fa-xmark', 'text-red-500')
                        return [loginError({ error: err.error.msg })]
                    })
                )
            }
            )
        )
    )

    updatePasswordFromProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatePasswordFromProfileRequest),
            switchMap(({ credentials }) => {
                const dialog = this.generalService.openDialogLoading()
                return this.authService.updatePasswordFromProfile(
                    credentials.email,
                    credentials.currentPassword,
                    credentials.newPassword,
                    credentials.confirmPassword,
                ).pipe(
                    map((resp) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(resp.msg, 'fa-solid fa-check', 'text-green-500', 3000)
                        return logoutRequest()
                    }),
                    catchError((err) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(err.error.msg, 'fa-solid fa-xmark', 'text-red-500')
                        return [loginError({ error: err.error.msg })]
                    })
                )
            }
            )
        )
    )

    logout$ = createEffect(() => this.actions$.pipe(
        ofType(logoutRequest),
        tap(() => {
            this.cookie.delete('token', '/');
        }),
        map(() => {
            this.route.navigateByUrl('/auth/login');
            return logoutSuccess();
        })
    ));


    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private route: Router,
        private generalService: GeneralService,
        private cookie: CookieService
    ) { }
}
