import { createReducer, on } from "@ngrx/store"
import { UserState } from "src/app/core/models/user/user.state"
import { loginError, loginSuccess, persistDataUserRequest, logoutSuccess } from "../actions/auth.action"

export const initialState: UserState = {
    loading: true,
    user: {
        id_usuario: null,
        nombres: '',
        apellidos: '',
        email: '',
        user_rol:null,
        token: '',
    },
    menuOptions: [
        {
            ACC_NOMBRE: '',
            id_roles: null,
            ACC_PAGINA: '',
            logo: '',
        }
    ],
    error: '',
}

export const _authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { user }) => {
        return {
            ...state,
            loading: false,
            user: user.user,
            menuOptions: user.menuOptions,
            error: '',
        }
    }),
    on(loginError, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error
        }
    }),    
    on(persistDataUserRequest, (state, { token }) => {
        return {
            ...state,
            loading: false,
            user: {
                ...state.user,
                token
            }
        }
    }),
    on(logoutSuccess, () => initialState),
)