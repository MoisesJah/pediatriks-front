import { IPaciente } from './paciente';
import { Paquete } from './paquetes';
import { Personal } from './personal';
import { Sede } from './sede';
import { Terapia } from './terapia';


export interface Cita {
  id_cita: string;
  paciente: IPaciente;
  sede: Sede;
  tipo_cita: string
  terapia: Terapia;
  paquete?: Paquete;
  sesion: {
    id_sesion: string;
    personal: Personal;
    fecha_inicio: string;
    hora_inicio: string;
    hora_fin: string;
    status: SesionStatus;
    num_sesion: number;
    num_cambios: number;
  };
}

export interface SesionStatus {
  id_status: number;
  nombre: string;
}