import { ActionReducerMap } from "@ngrx/store"
import { _authReducer,  } from '../state/reducers/auth.reducers'
import { CiteState } from "../core/models/cites/cites.state"
import { UserState } from "../core/models/user/user.state"
import { SpecialityState } from "../core/models/speciality/speciality.state"
import {HistoryState} from '../core/models/cites/history.state'

import { _citesReducer } from "./reducers/cites.redurcers"
import { _specialityReducers } from "./reducers/appointmentInfo.reducers"
import {_historyReducers } from "./reducers/history.reducers"

export interface AppState {
    user: UserState
    cites: CiteState
    speciality: SpecialityState
    history: HistoryState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    user: _authReducer,
    cites: _citesReducer,
    speciality: _specialityReducers,
    history: _historyReducers,
}