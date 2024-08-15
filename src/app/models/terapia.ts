export interface Terapia {
  id_terapia: string;
  id_administrador: string;
  nombre: string;
  descripcion: string;
  precio: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  id: number;
  estado: number;
}