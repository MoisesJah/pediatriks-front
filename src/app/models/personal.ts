export interface Personal {
  id_personal: number;
  id: number;
  id_tipopersonal: number;
  id_terapia: number;
  id_horariop: number;
  nombre: string;
  dni: string;
  telefono: string;
  correo: string;
  genero: string;
  sueldo: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

