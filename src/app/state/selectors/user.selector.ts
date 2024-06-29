import { createSelector } from "@ngrx/store"
import { AppState } from "../app.state"
import { UserState } from '../../core/models/user/user.state'

export const selectItems = (state: AppState) => state.user;

export const selectLoading = createSelector(
    selectItems,
    (state: UserState) => state.loading
)

export const selectDataUser = createSelector(
    selectItems,
    (state: UserState) => state.user
)

export const selectNameUser = createSelector(
    selectItems,
    (state: UserState) => state.user.nombres
)
export const selectLastNameUser = createSelector(
    selectItems,
    (state: UserState) => state.user.apellidos
)

export const selectEmailUser = createSelector(
    selectItems,
    (state: UserState) => state.user.email
)

export const selectIdUser = createSelector(
    selectItems,
    (state: UserState) => state.user.id_usuario
)
export const selectOptions = createSelector(
    selectItems,
    (state: UserState) => state.menuOptions
)
export const selectIdRol = createSelector(
    selectItems,
    (state: UserState) => state.user.user_rol
)