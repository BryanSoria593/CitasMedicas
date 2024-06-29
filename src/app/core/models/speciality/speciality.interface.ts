export interface SpecialityModel {    
    id_area: number
    nombre: string
    image: string  
}

export interface DoctorsModel{    
    id_doctor: number
    id_usuario: number
    disponibilidad: number
    nombres: string
    apellidos: string
    email: string
    id_especialidad: number
    nombre: string
    id_area: number
}
export interface TurnsModel{
    id_disponibilidad: number
    id_turno: number
    hora_inicio: string
    hora_final: string
}
    