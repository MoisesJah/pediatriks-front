export interface Paquete {
  id_paquete: string; 
  nombre: string;
  descripcion: string;
  cantidadsesiones: number;
  precioregular: number;
  descuento: number;
  preciopaquete: number;
  fechainicio: string;
  fechafin: string;
  sesionesrestantes: number;
}
