import { IPaciente } from './paciente';
import { Sede } from './sede';
import { Terapia } from './terapia';

export interface Cita {
  id_cita: string;
  paciente: IPaciente;
  personal: string;
  sede: Sede;
  tipocita: string
  terapia: Terapia;
  sesion: {
    id_sesion: string;
    fecha_inicio: string;
    hora_inicio: string;
    hora_fin: string;
    status: string;
    num_sesion: number;
  };
}
