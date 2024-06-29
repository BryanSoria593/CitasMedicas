import { createReducer, on } from "@ngrx/store"
import { HistoryState } from '../../core/models/cites/history.state'
import { getHistorialRequest, getHistorialSuccess } from "../actions/history.action"

export const initialState: HistoryState = {
    loading: true,
    history: {
        info: {
            extra_info: '',
            fecha_atencion: ''
        },
        images: [],
        medicaments: [],
    }
}

export const _historyReducers = createReducer(
    initialState,
    on(getHistorialRequest, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(getHistorialSuccess, (state, { history }) => {
        return {
            ...state,
            history,
            loading: false
        }
    })
)