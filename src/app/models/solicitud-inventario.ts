export interface SolicitudInventario {
  id_solicitud: string;
  cantidad: number;
  personal_solicita: {
    id_personal: string;
    nombre: string;
  };
  item : {
    id: string;
    nombre: string;
  }
  estado: {
    id_solicitud_estado: string;
    nombre: string;
  }

}
