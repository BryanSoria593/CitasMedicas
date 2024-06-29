import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { CitesService } from 'src/app/modules/patient/services/cites.service'
import { GeneralService } from 'src/app/shared/services/general.service'
import * as CitesActions from 'src/app/state/actions/cites.action'

@Injectable()

export class CitesEffects {
    
    loadAllCites$ = createEffect(() => this.actions$.pipe(
        ofType(CitesActions.loadAllCitesRequest),
        switchMap((action) =>
            this.citesService.getAllCites(action.idUser, action.userRol)
                .pipe(
                    map(
                        (resp) => {
                            return CitesActions.loadAllCitesSuccess({
                                cites: resp.citas
                            })
                        }
                    ),
                    catchError(
                        (error) => {
                            this.generalService.openSnackBar("Error al cargar las citas", 'Cerrar')
                            return [CitesActions.loadCitesError({ error: error.error.msg })]
                        }
                    )
                )
        )
    ))

    loadPendingCites$ = createEffect(() => this.actions$.pipe(
        ofType(CitesActions.loadCitesPendingRequest),
        switchMap((action) =>
            this.citesService.getCitesPending(action.idUser, action.userRol)
                .pipe(
                    map(
                        (resp) => {
                            return CitesActions.loadCitesPendingSuccess({
                                cites: resp.citas
                            })
                        }
                    ),
                    catchError(
                        (error) => {
                            return [CitesActions.loadCitesError({ error: error.error.msg })]
                        })
                )
        )
    ))

    loadAssistedCites$ = createEffect(() => this.actions$.pipe(
        ofType(CitesActions.loadCitesAssistedRequest),
        switchMap((action) =>
            this.citesService.getHistoryCites(action.idUser, action.userRol)
                .pipe(
                    map(
                        (resp) => {
                            return CitesActions.loadCitesAssistedSuccess({
                                cites: resp.citas
                            })
                        }
                    ),
                    catchError(
                        (error) => {
                            return [CitesActions.loadCitesError({ error: error.error.msg })]
                        })
                )
        )
    ))

    deleteCitesRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CitesActions.deleteCiteRequest),
            switchMap((action) => {
                const dialog = this.generalService.openDialogLoading()
                return this.citesService.deleteCite(action.id_cita).pipe(
                    map((resp) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(resp.msg, 'fa-solid fa-check', 'text-green-500')
                        return CitesActions.deleteCiteSuccess({ id_cita: action.id_cita })
                    }),
                    catchError((error) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(error.error.msg, 'fa-solid fa-xmark', 'text-red-500')
                        return [CitesActions.loadCitesError({ error: error.error.msg })]
                    })
                )
            }
            )
        )
    )

    newCiteRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CitesActions.newCiteRequest),
            switchMap((action) => {
                const dialog = this.generalService.openDialogLoading()
                return this.citesService.postNewCite(action.newCite).pipe(
                    map((resp) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(resp.msg, 'fa-solid fa-check', 'text-green-500')
                        this.route.navigateByUrl('/paciente/pendientes')
                        return CitesActions.newCiteSuccess()
                    }),
                    catchError((error) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(error.error.msg, 'fa-solid fa-xmark', 'text-red-500')
                        return [CitesActions.newCiteError({ error: error.error.msg })]
                    })
                )
            })
        )
    )

    updateCiteRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CitesActions.updateCiteRequest),
            switchMap((action) => {
                const dialog = this.generalService.openDialogLoading()
                return this.citesService.updateCite(action.updatedCite).pipe(
                    map((resp) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(resp.msg, 'fa-solid fa-check', 'text-green-500')
                        CitesActions.updateCiteSuccess()

                        if (window.location.pathname === '/cites/appointments') {
                            return CitesActions.loadAllCitesRequest({ idUser: action.updatedCite.idUser, userRol: action.updatedCite.userRol })
                        }

                        return CitesActions.loadCitesPendingRequest({ idUser: action.updatedCite.idUser, userRol: action.updatedCite.userRol })
                    }),
                    catchError((error) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(error.error.msg, 'fa-solid fa-xmark', 'text-red-500')
                        return [CitesActions.newCiteError({ error: error.error.msg })]
                    })
                )
            })
        )
    )

    constructor(
        private actions$: Actions,
        private citesService: CitesService,
        private generalService: GeneralService,
        private route: Router,

    ) { }
}