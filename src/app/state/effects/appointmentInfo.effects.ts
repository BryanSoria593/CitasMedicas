import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { CitesService } from 'src/app/modules/patient/services/cites.service'
import { GeneralService } from 'src/app/shared/services/general.service'
import {
    errorSpecialityGet,
    loadDoctorByAreaRequest,
    loadDoctorByAreaSuccess,
    loadSpecialityRequest,
    loadSpecialitySuccess,
    loadTurnsRequest,
    loadTurnsSucess
} from 'src/app/state/actions/appointmentInfo'

@Injectable()

export class SpecialityEffects {

    loadSpeciality$ = createEffect(() => this.actions$.pipe(
        ofType(loadSpecialityRequest),
        switchMap(() => this.citesService.getSpeciality()
            .pipe(
                map(
                    (resp) => {
                        return loadSpecialitySuccess({ speciality: resp.data })
                    }
                ),
                catchError(
                    (error) => {
                        return [errorSpecialityGet({ error })]
                    }
                )
            )
        )
    ))
    loadDoctors$ = createEffect(() => this.actions$.pipe(
        ofType(loadDoctorByAreaRequest),
        switchMap((action) => this.citesService.getDoctorBySpeciality(action.id_area)
            .pipe(
                map(
                    (resp) => {
                        if (resp.doctors.length < 1) {
                            /* in the second argument, place a class that specifies a logo in fontawesome and 
                            the color in taildwind */
                            this.generalService.openDialogSuccess(resp.msg, 'fa-solid fa-xmark', 'text-red-500', 3000)
                            return loadDoctorByAreaSuccess({ doctors: [] })
                        }
                        return loadDoctorByAreaSuccess({ doctors: resp.doctors })
                    }
                ),
                catchError(
                    (error) => {
                        return [errorSpecialityGet({ error })]
                    }
                )
            )
        )
    ))

    loadTurns$ = createEffect(() => this.actions$.pipe(
        ofType(loadTurnsRequest),
        switchMap((action) => this.citesService.getTurns(action.date, action.id_doctor)
            .pipe(
                map(
                    (resp) => {
                        return loadTurnsSucess({ turns: resp.data })
                    }
                )
            )
        )
    ))

    constructor(
        private actions$: Actions,
        private citesService: CitesService,
        private generalService: GeneralService
    ) { }
}
