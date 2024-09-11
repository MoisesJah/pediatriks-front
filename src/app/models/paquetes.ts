import { Terapia } from "./terapia";

export interface Paquete {
  id_paquetes: string;
  nombre: string;
  descripcion: string;
  cantidadsesiones: number;
  precioregular: number;
  descuento: number;
  preciopaquete: number;
  fechainicio: string;
  fechafin: string;
  sesionesrestantes: number;
  terapias: Terapia[];
}
