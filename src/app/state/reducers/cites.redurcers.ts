import { createReducer, on } from "@ngrx/store"
import { CiteState } from "src/app/core/models/cites/cites.state"
import {
    clearCites,
    deleteCiteSuccess,
    loadAllCitesRequest,
    loadAllCitesSuccess,
    loadCitesAssistedRequest,
    loadCitesAssistedSuccess,
    loadCitesPendingRequest,
    loadCitesPendingSuccess,
    newCiteRequest,
    newCiteSuccess,
    updateCiteRequest,
    updateCiteSuccess
} from "../actions/cites.action"

export const initialState: CiteState = {
    loading: true,
    cites: [],
}

export const _citesReducer = createReducer(
    initialState,
    on(loadAllCitesRequest, (state) => {
        return {
            ...state,
            loading: true
        }
    }),

    on(loadAllCitesSuccess, (state, { cites }) => {
        return {
            ...state,
            cites,
            loading: false
        }
    }),

    on(loadCitesPendingRequest, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadCitesPendingSuccess, (state, { cites }) => {
        return {
            ...state,
            cites,
            loading: false
        }
    }),
    on(loadCitesAssistedRequest, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadCitesAssistedSuccess, (state, { cites }) => {
        return {
            ...state,
            cites,
            loading: false
        }
    }),


    on(clearCites, () => initialState),

    on(deleteCiteSuccess, (state, { id_cita }) => {
        return {
            ...state,
            cites: state.cites.map(cite => cite.id_cita === id_cita ? { ...cite, estado: 'Cancelada' } : cite),
            loading: false
        }
    }),
    on(newCiteRequest, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(newCiteSuccess, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(updateCiteRequest, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(updateCiteSuccess, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
)