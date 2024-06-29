import { createSelector } from "@ngrx/store"
import { SpecialityState } from "src/app/core/models/speciality/speciality.state"
import { AppState } from "../app.state"

export const selectSpeciality = (state: AppState) => state.speciality

export const selectSpecialitys = createSelector(
    selectSpeciality,
    (state: SpecialityState) => state.speciality
)

export const selectLoadingSpecialitys = createSelector(
    selectSpeciality,
    (state: SpecialityState) => state.loading
)

export const selectErrorSpeciality = createSelector(
    selectSpeciality,
    (state:SpecialityState) => state.error
)

export const selectDoctors = createSelector(
    selectSpeciality,
    (state: SpecialityState) => state.doctors
)

export const selectTurns = createSelector(
    selectSpeciality,
    (state: SpecialityState) => state.turns
)