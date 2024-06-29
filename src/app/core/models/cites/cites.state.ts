import { CitesModel } from "../cites/cites.interface"

export interface CiteState {
    loading: boolean
    cites: CitesModel[]
    msg?: string
}

