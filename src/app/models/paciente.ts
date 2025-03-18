import { IUser } from './user';

export interface IPaciente {
  id_paciente: string;
  id: number;
  dni: string;
  nombre: string;
  diagnostico: string;
  fecha_nacimiento: Date;
  direccion: string;
  genero: string;
  user?: IUser;
}
