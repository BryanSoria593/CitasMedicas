import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { HistoryService } from 'src/app/modules/patient/services/history.service'
import { GeneralService } from 'src/app/shared/services/general.service'
import { getHistorialError, getHistorialRequest, getHistorialSuccess } from 'src/app/state/actions/history.action'

@Injectable()

export class HistoryEffects {

    loadHistory$ = createEffect(() => this.actions$.pipe(
        ofType(getHistorialRequest),
        switchMap((action) => {
            const dialog = this.generalService.openDialogLoading()
            return this.historyService.getHistoryByCite(action.idCite)
                .pipe(
                    map(
                        (resp) => {
                            dialog.close()
                            return getHistorialSuccess({
                                history: resp.history
                            })
                        }
                    ),
                    catchError((error) => {
                        dialog.close()
                        this.generalService.openDialogSuccess(error.error.msg, 'fa-solid fa-xmark', 'text-red-500')
                        return [getHistorialError({ error: error.error.msg })]
                    })
                )
        }
        )
    ))

    constructor(
        private actions$: Actions,
        private historyService: HistoryService,
        private generalService: GeneralService
    ) { }
}