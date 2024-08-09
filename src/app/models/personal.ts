export interface Personal {
  id_personal: number;
  id: number;
  id_administrador: number;
  id_tipopersonal: number;
  id_terapia: number;
  id_horariop: number;
  nombre: string;
  dni: string;
  telefono: string;
  correo: string;
  genero: string;
  sueldo: number;
  estado: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

