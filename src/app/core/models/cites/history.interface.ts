export interface ImagesHistoryModel{
    id_imagen: number
    id_historial: number
    name: string
    url: string
}
export interface MedicamentHistoryModel{
    
    id_receta: number
    medicamento: string
    indicacion: string
    id_cita: number
}

export interface InfoModel{
    extra_info: string
    fecha_atencion: string
}

export interface HistoryModel{
    info: InfoModel
    images: ImagesHistoryModel[]
    medicaments: MedicamentHistoryModel[]
}