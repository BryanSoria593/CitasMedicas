import { createReducer, on } from "@ngrx/store";
import { UserState } from "src/app/core/models/user/user.state";
import { loginError, loginSuccess, logout, renewToken } from "../actions/auth.action";


export const initialState: UserState = {
    loading: false,
    user: {
        id_usuario: null,
        nombres: '',
        apellidos: '',
        email: '',
        imagen: '',
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
};

// Reducer de Login
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
    on(logout, () => initialState)



);

