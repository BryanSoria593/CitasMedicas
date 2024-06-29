import { createAction, props } from "@ngrx/store"
import { HistoryModel } from "src/app/core/models/cites/history.interface"

export const getHistorialRequest = createAction(
    "[Cites] Get History Request",
    props<{ idCite: number }>()
)
export const getHistorialSuccess = createAction(
    "[Cites] Get History Success",
    props<{ history: HistoryModel }>()
)

export const getHistorialError = createAction(
    "[Cites] Get History Error",
    props<{ error: string }>()
)