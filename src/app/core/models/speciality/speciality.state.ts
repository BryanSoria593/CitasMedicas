import { SpecialityModel } from "./speciality.interface";

export interface SpecialityState {
    loading: boolean;
    speciality: SpecialityModel[];
}