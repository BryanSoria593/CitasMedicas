import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserModel } from '../../core/models/user/user.interface';
import { UserState } from '../../core/models/user/user.state';

export const selectItems = (state: AppState) => state.user;
export const selectMenuOptions = (state: AppState) => state;

export const selectLoading = createSelector(
    selectItems,
    (state: UserState) => state.loading
)

export const selectDataUser = createSelector(
    selectItems,
    (state: UserState) => state.user
);
export const selectIdUser = createSelector(
    selectItems,
    (state: UserState) => state.user.id_usuario
)
export const selectOptions = createSelector(
    selectItems,
    (state: UserState) => state.menuOptions
)





