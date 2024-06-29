import { createAction, props } from "@ngrx/store"
import { CitesModel, NewCiteModel, UpdateCiteModel,  } from "src/app/core/models/cites/cites.interface"

export const loadAllCitesRequest = createAction(
    "[Cites] Load cites",
    props<{ idUser: number, userRol: number }>()
)

export const loadAllCitesSuccess = createAction(
    "[Cites] Load cites success",
    props<{ cites: CitesModel[] }>()
)

export const loadCitesPendingRequest = createAction(
    "[Cites] Load cites pending",
    props<{ idUser: number, userRol: number }>()
)
export const loadCitesPendingSuccess = createAction(
    "[Cites] Load cites pending success",
    props<{ cites: CitesModel[] }>()
)

export const loadCitesAssistedRequest = createAction(
    "[Cites] Load cites assisted",
    props<{ idUser: number, userRol: number }>()
)

export const loadCitesAssistedSuccess = createAction(
    "[Cites] Load cites assisted success",
    props<{ cites: CitesModel[] }>()
)

export const loadCitesError = createAction(
    "[Cites] Load cites error",
    props<{ error: string }>()
)

export const clearCites = createAction(
    "[Cites] Clear cites"
)

export const deleteCiteRequest = createAction(
    "[Cites] Delete cite",
    props<{ id_cita: number }>()
)
export const deleteCiteSuccess = createAction(
    "[Cites] Delete cite success",
    props<{ id_cita: number }>()

)
export const newCiteRequest = createAction(
    "[Cites] New Cite Request",
    props<{ newCite: NewCiteModel }>()
)
export const newCiteSuccess = createAction(
    "[Cites] New Cite Sucess"
)

export const newCiteError = createAction(
    "[Cites] New Cite error",
    props<{ error: string }>()
)
export const updateCiteRequest = createAction(
    "[Cites] Update Cite Request",
    props<{ updatedCite: UpdateCiteModel }>()
)
export const updateCiteSuccess = createAction(
    "[Cites] Update Cite Success",
)