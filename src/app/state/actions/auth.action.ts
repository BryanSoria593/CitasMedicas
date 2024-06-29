import { createAction, props } from "@ngrx/store"
import { LoginModel, RegisterModel, UpdatePasswordFromProfile, UpdateProfileModel } from "src/app/core/models/user/user.interface"
import { UserState } from "src/app/core/models/user/user.state"

export const loginRequest = createAction(
    "[Auth] Load user",
    props<{ credentials: LoginModel }>()
)

export const loginSuccess = createAction(
    "[Auth] Load success user",
    props<{ user: UserState }>()
)

export const loginError = createAction(
    "[Auth] Load error user",
    props<{ error: string }>()
)

export const persistDataUserRequest = createAction(
    "[Auth] load user persisted",
    props<{ token: string }>()
)

export const persistDataUserSuccess = createAction(
    "[Auth] load user persisted success",
    props<{ user: UserState }>()
)

export const renewToken = createAction(
    "[Auth] Renew token",
    props<{ token: string }>()
)

export const registerRequest = createAction(
    "[Auth] Register user",
    props<{ credentials: RegisterModel }>
)

export const updateProfileRequest = createAction(
    "[Auth] Update Profile Request",
    props<{ credentials: UpdateProfileModel }>()
)

export const updatePasswordFromProfileRequest = createAction(
    "[Auth] Update Password Request",
    props<{ credentials: UpdatePasswordFromProfile }>()
)

export const logoutRequest = createAction('[Auth] Logout');

export const logoutSuccess = createAction("[Auth] Logout Success")
