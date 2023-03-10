import { createReducer, on } from "@ngrx/store";
import { CiteState } from "src/app/core/models/cites/cites.state";
import { clearCites, loadAllCitesSuccess, loadCitesPendingSuccess } from "../actions/cites.action";


export const initialState: CiteState = {
    loading: false,
    cites: []
}
export const _citesReducer = createReducer(
    initialState,
    on(loadAllCitesSuccess, (state, { cites }) => {
        return {
            ...state,
            cites: cites,
            loading: true
        }
    }
    ),
    on(loadCitesPendingSuccess, (state, { cites }) => {
        return {
            ...state,
            cites: cites,
            loading: true
        }
    }),
    on(clearCites, ()=> initialState ) 

    

)