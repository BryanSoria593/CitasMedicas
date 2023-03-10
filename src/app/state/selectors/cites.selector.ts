import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import {CiteState} from "../../core/models/cites/cites.state";

export const selectItems = (state: AppState) => state.cites

export const selectLoading = createSelector(
    selectItems,
    (state: CiteState) => state.loading
)
export const selectCites = createSelector(
    selectItems,
    (state: CiteState) => state.cites
)







