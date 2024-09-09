import { IPaciente } from "./paciente"
import { Terapia } from "./terapia"

export interface Cita{
    id_cita: string
    paciente: IPaciente
    id_paciente:string
    id_tipocita: string
    terapias: Terapia[] & {pivot:{}}
    sesiones: []
}