import { SpecialityModel,DoctorsModel, TurnsModel } from "./speciality.interface"

export interface SpecialityState {
    loading: boolean
    speciality: SpecialityModel[]
    doctors: DoctorsModel[]
    turns: TurnsModel[]
    error?:string
}