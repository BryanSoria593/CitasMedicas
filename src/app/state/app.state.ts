import { UserModel } from "../core/models/user/user.interface";
import { ActionReducerMap } from "@ngrx/store";
import { _authReducer,  } from '../state/reducers/auth.reducers';
import { CiteState } from "../core/models/cites/cites.state";
import { _citesReducer } from "./reducers/cites.redurcers";
import { UserState } from "../core/models/user/user.state";

export interface AppState {
    user: UserState;
    cites: CiteState;

}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    user: _authReducer,
    cites: _citesReducer
}

