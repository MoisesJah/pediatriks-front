export interface Personal {
  id_personal: string;
  id: number;
  id_tipopersonal: string;
  id_terapia: string;
  id_genero: string;
  id_sede: string;
  terapia: {id_terapia: string, color: string,duracion:string};
  // id_horariop: string;
  horarios: any[];
  nombre: string;
  dni: string;
  telefono: string;
  correo: string;
  genero: string;
  sueldo: number;
  direccion: string;
  nro_colegiatura: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  cv: File | null;
}

