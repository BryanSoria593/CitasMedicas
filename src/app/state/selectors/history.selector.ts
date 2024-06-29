import { createSelector } from "@ngrx/store"
import { AppState } from "../app.state"
import { HistoryState } from '../../core/models/cites/history.state'

export const selectItems = (state: AppState) => state.history

export const selectLoading = createSelector(
    selectItems,
    (state: HistoryState) => state.loading
)

export const selectInfOfCite = createSelector(
    selectItems,
    (state: HistoryState) => state.history.info
)

export const selectMedicaments = createSelector(
    selectItems,
    (state: HistoryState) => state.history.medicaments
)

export const selectImages = createSelector(
    selectItems,
    (state: HistoryState) => state.history.images
)