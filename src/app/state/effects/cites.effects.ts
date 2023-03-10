import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, tap, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { CitesService } from 'src/app/modules/cites/services/cites.service';

import { GeneralService } from 'src/app/shared/services/general.service';
import * as CitesActions from 'src/app/state/actions/cites.action';


@Injectable()

export class CitesEffects {

    loadAllCites$ = createEffect(() => this.actions$.pipe(        
        ofType(CitesActions.loadAllCitesRequest),
        exhaustMap( (action)=>
            this.citesService.getAllCites( action.id_usuario )                        
            .pipe(
                map(
                    (resp)=>{
                        return CitesActions.loadAllCitesSuccess({
                            cites: resp.citas                            
                        })
                    }
                ),
                catchError(
                    (error) => {                            
                        this.generalService.openSnackBar(error.error.msg, 'Cerrar');
                        return [CitesActions.loadCitesError({ error: error.error.msg })]
                    }
                )
                               
            )
         )    
    ))
    loadPendingCites$ = createEffect(() => this.actions$.pipe(
        ofType(CitesActions.loadCitesPendingRequest),
        exhaustMap( (action)=>
            this.citesService.getCitesPending( action.id_usuario )
            .pipe(
                map(
                    (resp)=>{
                        return CitesActions.loadCitesPendingSuccess({
                            cites: resp.citas                          
                        })
                    }                    
                ),
                catchError(
                    (error)=>{
                        return [CitesActions.loadCitesError({error:error.error.msg})]
                    }
                )
            )

        )
    ))

    constructor(
        private actions$: Actions,
        private citesService: CitesService,        
        private generalService: GeneralService,

    ) { }
}