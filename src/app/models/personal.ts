export interface Personal {
  id_personal: string;
  id: number;
  id_tipopersonal: string;
  id_terapia: string;
  id_horariop: string;
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

