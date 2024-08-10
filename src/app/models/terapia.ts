<<<<<<< HEAD
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
=======
export interface ITerapia {
    id_terapia: string;
    nombre: string;
    descripcion: number;
    precio: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
>>>>>>> 922c31591d0f95ddc1095ab916ac18b9f58bd4a6
