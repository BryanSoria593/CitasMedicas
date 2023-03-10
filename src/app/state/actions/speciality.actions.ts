import { createAction, props } from "@ngrx/store";
import { CitesModel } from "src/app/core/models/cites/cites.interface";


export const loadAllCitesRequest = createAction(
    "[Cites] Load cites",
    props<{ id_usuario: number }>()
)

export const loadAllCitesSuccess = createAction(
    "[Cites] Load cites success",
    props<{ cites: CitesModel[] }>()
)

export const loadCitesPendingRequest = createAction(
    "[Cites] Load cites pending",
    props<{ id_usuario: number }>()
)
export const loadCitesPendingSuccess = createAction(
    "[Cites] Load cites pending success",
    props<{ cites: CitesModel[] }>()
)
