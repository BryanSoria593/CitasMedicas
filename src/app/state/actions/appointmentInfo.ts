import { createAction, props } from "@ngrx/store"
import { SpecialityModel, DoctorsModel, TurnsModel } from "src/app/core/models/speciality/speciality.interface"

export const loadSpecialityRequest = createAction(
    "[Cites] Load Areas",
)

export const loadSpecialitySuccess = createAction(
    "[Cites] Load Areas success",
    props<{ speciality: SpecialityModel[] }>()
)

export const errorSpecialityGet = createAction(
    "[Cites] Error Speciality",
    props<{ error: string }>()
)

export const loadDoctorByAreaRequest = createAction(
    "[Cites] Load Doctor By Area",
    props<{ id_area: number }>()
)
export const loadDoctorByAreaSuccess = createAction(
    "[Cites] Load Doctor By Area success",
    props<{ doctors: DoctorsModel[] }>()
)
export const loadTurnsRequest = createAction(
    "[Cites] Load Turns",
    props<{ date: string, id_doctor: number}>()
)

export const loadTurnsSucess = createAction(
    "[Cites] Load Turns Success",
    props<{ turns: TurnsModel[] }>()
)