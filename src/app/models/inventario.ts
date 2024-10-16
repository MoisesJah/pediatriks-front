export interface Inventario {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  costo_stock: number;
  banner_url: string;
  created_at: Date;
  updated_at: Date;
}
