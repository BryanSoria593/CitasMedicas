import { createAction, props } from "@ngrx/store";
import { LoginModel, RegisterModel } from "src/app/core/models/user/user.interface";
import { UserState } from "src/app/core/models/user/user.state";

export const loginRequest = createAction(
    "[Auth] Load user",
    props<{ credentials: LoginModel}>()
)
export const loginSuccess = createAction(
    "[Auth] Load success user",
    props<{ user: UserState }>()
)
export const loginError = createAction(
    "[Auth] Load error user",
    props<{ error: string }>()
)
export const renewToken = createAction(
    "[Auth] Renew token",
    props<{ token: string }>()    
)
export const registerRequest = createAction(
    "[Auth] Register user",
    props<{ credentials: RegisterModel }>
)

export const logout = createAction("[Auth] Logout")




