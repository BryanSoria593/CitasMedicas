import { createReducer, on } from "@ngrx/store"
import { SpecialityState } from "src/app/core/models/speciality/speciality.state"
import {
    loadDoctorByAreaRequest,
    loadDoctorByAreaSuccess,
    loadSpecialityRequest,
    loadSpecialitySuccess,
    loadTurnsRequest,
    loadTurnsSucess
} from "../actions/appointmentInfo"

export const initialState: SpecialityState = {
    loading: true,
    speciality: [
        {
            id_area: null,
            nombre: '',
            image: ''
        }
    ],
    doctors: [
        {
            id_doctor: null,
            id_usuario: null,
            disponibilidad: null,
            nombres: '',
            apellidos: '',
            email: '',
            id_especialidad: null,
            nombre: '',
            id_area: null
        }
    ],
    turns: [
        {
            id_disponibilidad: null,
            id_turno: null,
            hora_inicio: '',
            hora_final: ''
        }
    ],
    error: null

}

export const _specialityReducers = createReducer(
    initialState,
    on(loadSpecialityRequest, (state) => ({ ...state, loading: true })),
    on(loadSpecialitySuccess, (state, { speciality }) => ({ ...state, loading: false, speciality })),
    on(loadDoctorByAreaRequest, (state) => ({ ...state, loading: true })),
    on(loadDoctorByAreaSuccess, (state, { doctors }) => ({ ...state, loading: false, doctors })),
    on(loadTurnsRequest, (state) => ({ ...state, loading: true })),
    on(loadTurnsSucess, (state, { turns }) => ({ ...state, loading: false, turns }))
)