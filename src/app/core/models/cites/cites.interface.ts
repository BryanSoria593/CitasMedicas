export interface CitesModel {
    id_cita: number
    id_paciente: number
    id_doctor: number
    fecha: string
    estado: string
    turno: string
    doctor: string
    paciente: string
    hora_inicio: string
    hora_final: string
    area: string
    dni: string
}

export interface NewCiteModel {
    idSpeciality: number
    idUser: number
    idDoctor: number
    date: string
    idTurn: number
}

export interface Medicament {
    medicament: string
    instruction: string
}

export interface Image {
    name: string
    url: string
}

export interface PreImageUpload {
    name: string
    file: string
}

export interface UpdateCiteModel {
    date: string
    idTurn: number
    idCite: number
    idUser: number
    userRol: number
}