export interface TipoPersonal {
  id_tipopersonal: string;      
  id: string;
  id_administrador: string;
  especialidad: string;
  descripcion: string;
  estado: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
